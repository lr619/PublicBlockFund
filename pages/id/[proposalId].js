import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import * as fcl from "@onflow/fcl";
import { useAuth } from "../../contexts/AuthContext";
import Link from 'next/link';
import DepositModal from '../../components/Deposit';
import { Dialog, Transition } from '@headlessui/react';
import styled from 'styled-components';


export default function Id() {
  const router = useRouter();
  const { proposalId } = router.query;
  const { user } = useAuth();
  const [proposal, setProposal] = useState({ voteCounts: { '0': {}, '1': {}, '2': {} }, voteTotals: {}, votes: {}, ref: {} });
  const [balance, setBalance] = useState();
  const [treasuryInfo, setTreasuryInfo] = useState({});


  useEffect(() => {
    if (proposalId) {
      getProposal(proposalId);
      getBalance();
    }
  }, [proposalId]);

  useEffect(() => {
    getTreasuryInfo();
  }, []);

  async function getTreasuryInfo() {
    const result = await fcl.query({
      cadence: `
      import Multisign from 0xDeployer

      pub fun main(treasuryAddress: Address): Info {
        let treasury = getAccount(treasuryAddress).getCapability(Multisign.TreasuryPublicPath)
                          .borrow<&Multisign.Treasury{Multisign.TreasuryPublic}>()
                          ?? panic("There does not exist a treasury here.")
    
        return Info(treasury.admins, treasury.getTreasuryBalance(), treasury.pendingProposals, treasury.completedProposals, treasury.deposits, treasury.orderedActions)
      }
      
      pub struct Info {
        pub let admins: [Address]
        pub let balance: UFix64
        pub let pendingProposals: {UInt64: Multisign.PendingProposal}
        pub let completedProposals: {UInt64: Multisign.CompletedProposal}
        pub let deposits: {UInt64: Multisign.Deposit}
        pub let orderedActions: [{Multisign.Action}]
      
        init(
          _ admins: [Address],
          _ balance: UFix64,
          _ pendingProposals: {UInt64: Multisign.PendingProposal},
          _ completedProposals: {UInt64: Multisign.CompletedProposal},
          _ deposits: {UInt64: Multisign.Deposit},
          _ orderedActions: [{Multisign.Action}]
        ) {
          self.admins = admins
          self.balance = balance
          self.pendingProposals = pendingProposals
          self.completedProposals = completedProposals
          self.deposits = deposits
          self.orderedActions = orderedActions
        }
      }
      `,
      args: (arg, t) => [arg(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, t.Address)]
    });

    console.log(result);

    setTreasuryInfo(result);
  }

  async function castVote(vote) {
    const transactionId = await fcl.mutate({
      cadence: `
      `,
      args: (arg, t) => [
        arg(parseInt(proposalId), t.UInt64),
        arg(vote, t.String)
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id', transactionId);
    await fcl.tx(transactionId).onceSealed();
    getProposal(proposalId);
  }

  async function getProposal(proposalId) {
    console.log(proposalId);
    const response = await fcl.query({
      cadence: `
      import Vote from 0xDeployer

      pub fun main(proposalId: UInt64): Proposal? {
        if let proposal: &Vote.Proposal{Vote.ProposalPublic} = Vote.getProposal(proposalId: proposalId) {
            return Proposal(
                ref: proposal,
                votes: proposal.getVotes(),
                voteCounts: proposal.getVoteCounts(),
                voteTotals: proposal.getVoteTotals(),
                stage: proposal.getStage()
            )
        } else {
            return nil
        }
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
      args: (arg, t) => [
        arg(parseInt(proposalId), t.UInt64)
      ]
    });

    console.log(response);

    setProposal(response);
  }

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


  return (
    <WholeContentWrapper>
      <LeftContentWrapper>
        <div className='flex mb-12 justify-between'>
          <div>
            <Name className='text-gray-200 text-3xl font-bold'>{proposal.ref.name}</Name>
            <p className='text-gray-300 opacity-75'>Fundraiser started by: {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}</p>
            <p className='text-gray-300 opacity-75'>Start date: {new Date(proposal.ref.startTime * 1000).toLocaleString()}</p>
          </div>

        </div>
        <div className='rounded-lg bg-none text-white flex items-center justify-center'>
          <img className='max-w-sm' src={`https://nftstorage.link/ipfs/${proposal.ref.image}`} />
        </div>
        <Discription className='text-gray-300 opacity-75 text-lg'>
          {proposal.ref.description}
        </Discription>
      </LeftContentWrapper>

      <ContentWrapper>
      <div className='rounded-lg max-h-max flex flex-col justify-between p-4 bg-[white] shadow-lg shadow-blue-400/20 space-y-10'>
            <div className='flex justify-between'>
              <div className='pl-4 '>
                <h1 className='text-black-300 text-sm'>Total Balance</h1>
                <h1 className='text-green-400 text-3xl pt-3'>{parseFloat(treasuryInfo.balance).toFixed(3)} FLOW</h1>
                <p className='text-gray-400 pl-1'>~{parseFloat(treasuryInfo.balance).toFixed(3) * 1.5} USD</p>
              </div>
              <div className="space-y-2 rounded-lg px-5 pb- pt-1 max-w-max">
              </div>

            </div>

            <div className='flex justify-between px-5 space-x-4'>
              <DepositModal refreshInfo={getTreasuryInfo} />
            </div>
          </div>


          <div className='pt-5'>
            <h1 className='text-[white] text-lg'>Transaction History</h1>
          </div>

          {treasuryInfo.orderedActions?.slice(0).reverse().map((action, index) => {
            if (action.type == "Deposit") {
              return (
                <Container>
                <Link href={`/deposit/${action.id}`} key={index}>
                  <a className='rounded-lg bg-[white] text-white hover:bg-[#DCDCDC] flex cursor-pointer items-center py-4 px-9 justify-between'>
                    <div className='flex items-center space-x-3'>
                      <p className='text-lg font-semibold text-black'>#{action.id}</p>

                      <h2 className='text-xl font-semibold text-black'>{action.proposedBy}</h2>
                      <p className='text-sm text-gray-400 pl-10 truncate ...  w-1/2'>
                        {action.description}
                      </p>
                    </div>
                    <div className='font-semibold text-[#2bbc9f]'>+ {parseFloat(action.amount).toFixed(3)} FLOW</div>
                  </a>
                </Link>
                </Container>
              )
            }
          })||null}


</ContentWrapper>
    </WholeContentWrapper>
    
  )
}
const ContentWrapper = styled.div`
  display:flex;
  flex-direction:column;
  padding-top:5%;
`
const WholeContentWrapper = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  text-align:center;
  gap:10%;
  background-color:#1a1d25;
  height:80vw;
  padding-top:5%;
  `
const LeftContentWrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  `

const Discription = styled.div`
  color:white;
  width:100%;
  height:100%;
  border-radius:10px;
  padding:2rem;
  color:white;
  font-size:1.5rem;
  font-family: "Times New Roman", Times, serif;
  `
  

  const Name = styled.div`
  color:white;
  font-weight:bold;
  width:100%;
  padding-top:2rem;
  padding-bottom:1rem;
`
const Container = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  padding-bottom:1rem;
  `

  const Title = styled.div`
  color:white;
  font-weight:bold; 
  width:80%; `
  

  const SubContentWrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  width:100%;
  `