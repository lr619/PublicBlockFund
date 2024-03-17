import Link from 'next/link';
import * as fcl from "@onflow/fcl";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CoolTextEffect from '../components/customhook/CoolTextEffect';

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
      <ContentWrapper>
          <CoolTextEffect></CoolTextEffect>
            <SubCOntent>Crowdfunding on the Blockchain for you!</SubCOntent> 
        {!user.loggedIn ? <SubSUbContent>Please connect to your wallet</SubSUbContent> : !balance ? <button onClick={joinDAO} className='rounded-lg font-semibold text-md py-2 px-6 text-white bg-blue-500'>Authorize</button> : <>
          <DriverWrapper>
            <Driver className='text-gray-200 text-2xl font-bold'>Charity Drives</Driver>
            <Link href='/submit'>
              <HyperLink className='rounded-lg font-semibold text-md py-2 px-6 bg-gray-300'>Create new Block Fund</HyperLink>
            </Link>
          </DriverWrapper>
          <DonationTarget>
          {proposals.map((proposal, index) => (
            <Link href={`/id/${proposal.ref.uuid}`} key={index}>
              <div className='rounded-lg bg-[white] text-white hover:bg-[#DCDCDC] flex cursor-pointer items-center py-4 px-9 justify-between'>
                <div className='flex items-center space-x-3'>
                  <p className='text-x0.8 font-semibold text-black'>#{proposal.ref.uuid}</p>
                  <TxtName className='text-xl font-semibold'>{proposal.ref.name}</TxtName>
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
          </DonationTarget>
        </>
        }
        </ContentWrapper>
        
  )
}


const ContentWrapper = styled.div`
  background-color:#1a1d25;
  display:flex;
  flex-direction:column;
  width:98.8vw;
  justify-content:center;
  height:100vh;
  align-items:center;
  text-align:center;
  `

const Content = styled.div`
  color:white;
  font-weight:bold;
  font-decoration:none;
  font-size:4rem;
  margin-top:20px;
`
const SubCOntent = styled.div`
  color:white;
  font-decoration:none;
  font-size:1.5rem;
  padding-bottom:1rem;
`
const SubSUbContent = styled.div`
  width:20%;
  color:#6495ED;
  font-decoration:none;
  font-size:1.5rem;
  padding-bottom:1rem;
`
const DriverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
  gap:20px;

  `

  const Driver = styled.div`
  color:white;
  
  `
  const TxtName = styled.div`
  color:black;
  
  `

  const DonationTarget = styled.div`
    padding-top:2rem;
    width:60%;
  `
  const HyperLink = styled.a`
  transition: all 0.3s ease;
    &:hover {
      transform: scale(1.05);
      background-color:white;
    }
  `