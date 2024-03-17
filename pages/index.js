import Link from 'next/link';
import * as fcl from "@onflow/fcl";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from 'react';

export default function Home() {
  const [proposals, setProposals] = useState([]);
  const [balance, setBalance] = useState();
  const { user } = useAuth();

  useEffect(() => {
    getProposals();
  }, []);

  useEffect(() => {
    getBalance();
  }, [user])

  async function getBalance() {
    if (!user.loggedIn) {
      setBalance(null);
      return;
    }
    const response = await fcl.query({
      cadence: `
      import FungibleToken from 0xStandard
      import ExampleToken from 0xDeployer

      pub fun main(account: Address): UFix64? {
          let vaultRef = getAccount(account).getCapability(ExampleToken.VaultBalancePath)
                          .borrow<&ExampleToken.Vault{FungibleToken.Balance}>()

          return vaultRef?.balance
      }
      `,
      args: (arg, t) => [arg(user.addr, t.Address)]
    });

    setBalance(response);
  }

  async function getProposals() {
    const response = await fcl.query({
      cadence: `
      import Vote from 0xDeployer

      pub fun main(): [Proposal] {
        let answer: [Proposal] = []
        
        let proposals = Vote.getProposals()
        for proposal in proposals {
            answer.append(Proposal(
                ref: proposal,
                votes: proposal.getVotes(),
                voteCounts: proposal.getVoteCounts(),
                voteTotals: proposal.getVoteTotals(),
                stage: proposal.getStage()
            ))
        }
    
        return answer
      }
      
      pub struct Proposal {
          pub let ref: &Vote.Proposal{Vote.ProposalPublic}
          pub let votes: {Address: UInt8}
          pub let voteCounts: {UInt8: {Address: UFix64}}
          pub let voteTotals: {UInt8: UFix64}
          pub let stage: UInt8
      
          init(ref: &Vote.Proposal{Vote.ProposalPublic}, votes: {Address: UInt8}, voteCounts: {UInt8: {Address: UFix64}}, voteTotals: {UInt8: UFix64}, stage: Vote.Stage) {
              self.ref = ref
              self.votes = votes
              self.voteCounts = voteCounts
              self.voteTotals = voteTotals
              self.stage = stage.rawValue
          }
      }
      `,
      args: (arg, t) => []
    });

    console.log(response);

    setProposals(response);
  }

  async function joinDAO() {
    const transactionId = await fcl.mutate({
      cadence: `
      import FungibleToken from 0xStandard
      import ExampleToken from 0xDeployer

      transaction() {

          prepare(signer: AuthAccount) {
              destroy signer.load<@FungibleToken.Vault>(from: ExampleToken.VaultStoragePath)
              signer.unlink(ExampleToken.VaultReceiverPath)
              signer.unlink(ExampleToken.VaultBalancePath)

              if signer.borrow<&ExampleToken.Vault>(from: ExampleToken.VaultStoragePath) == nil {
                  signer.save(<-ExampleToken.createEmptyVault(), to: ExampleToken.VaultStoragePath)
                  signer.link<&ExampleToken.Vault{FungibleToken.Receiver}>(ExampleToken.VaultReceiverPath, target: ExampleToken.VaultStoragePath)
                  signer.link<&ExampleToken.Vault{FungibleToken.Balance}>(ExampleToken.VaultBalancePath, target: ExampleToken.VaultStoragePath)
              }
          }
      }
      `,
      args: (arg, t) => [],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id', transactionId);
    await fcl.tx(transactionId).onceSealed();
    getBalance();
  }

  return (
    <div className='flex justify-center pt-20'>
      <div className='w-[70%] space-y-6'>
        <div className='space-y-3 mb-12'>
          <h1 className='text-gray-200 text-2xl font-bold'>Welcome to {"<Example DAO>"}</h1>
          <p className='text-gray-400 text-lg font-semibold '>
            {"<DAO voting system>"}
          </p>
        </div>
        {!user.loggedIn ? null : !balance ? <button onClick={joinDAO} className='rounded-lg font-semibold text-md py-2 px-6 text-white bg-green-500'>Join this DAO</button> : <>
          <div className='flex items-center justify-between mb-7'>
            <h1 className='text-gray-200 text-2xl font-bold'>Proposals</h1>
            <>Picture Card</>
            <Link href='/submit'>
              <a className='rounded-lg font-semibold text-md py-2 px-6 bg-gray-300'>Donate</a>
            </Link>
          </div>
          {proposals.map((proposal, index) => (
            <Link href={`/id/${proposal.ref.uuid}`} key={index}>
              <div className='rounded-lg bg-[#00344B] text-white hover:bg-[#0f4962] flex cursor-pointer items-center py-4 px-9 justify-between'>
                <div className='flex items-center space-x-3'>
                  <p className='text-xl font-semibold text-gray-300'>#{proposal.ref.uuid}</p>
                  <h2 className='text-xl font-semibold text-gray-200'>{proposal.ref.name}</h2>
                  <p className='text-sm text-gray-400'>
                    {proposal.stage == 0 ?
                      `Starts ${new Date(proposal.ref.startTime * 1000).toLocaleString()}` :
                      proposal.stage == 1 ?
                        `Ending ${new Date(proposal.ref.endTime * 1000).toLocaleString()}` :
                        null}
                  </p>
                </div>
                {proposal.stage == 0 ?
                  <div className='rounded-lg py-2 px-6 bg-red-500'>Waiting</div> :
                  proposal.stage == 1 ?
                    <div className='rounded-lg py-2 px-6 bg-[#2bbc9f]'>Ongoing</div> :
                    <div className='rounded-lg py-2 px-6 bg-green-600'>Executed</div>}
              </div>
            </Link>
          ))}
        </>
        }
      </div>
    </div>
  )
}


