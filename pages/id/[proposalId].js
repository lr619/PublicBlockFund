import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import * as fcl from "@onflow/fcl";
import { useAuth } from "../../contexts/AuthContext";

export default function Id() {
  const router = useRouter();
  const { proposalId } = router.query;
  const { user } = useAuth();
  const [proposal, setProposal] = useState({ voteCounts: {}, votes: {}, ref: {} });

  useEffect(() => {
    if (proposalId) {
      getProposal(proposalId);
    }
  }, [proposalId]);

  async function castVote(vote) {
    const transactionId = await fcl.mutate({
      cadence: `
      import Vote from 0xDeployer

      transaction(proposalId: UInt64, vote: String) {

          let Identity: &Vote.Identity

          prepare(signer: AuthAccount) {
              // Only setup an identity if they haven't set up already.
              if signer.borrow<&Vote.Identity>(from: Vote.IdentityStoragePath) == nil {
                  // Create a new Identity (to cast votes) and put it in storage
                  signer.save(<- Vote.createIdentity(), to: Vote.IdentityStoragePath)
              }

              self.Identity = signer.borrow<&Vote.Identity>(from: Vote.IdentityStoragePath)!
          }

          pre {
              vote == "for" || vote == "against" || vote == "abstain": "This is not a valid voting option."
          }

          execute {
              let decision = vote == "for" ? Vote.Decision.for : vote == "against" ? Vote.Decision.against : Vote.Decision.abstain
              self.Identity.castBallot(proposalId: proposalId, decision: decision)
          }
      }
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

      pub fun main(proposalId: UInt64): Proposal {
        let proposal: &Vote.Proposal{Vote.ProposalPublic}? = Vote.getProposal(proposalId: proposalId)
        return Proposal(
            ref: proposal,
            votes: proposal?.getVotes(),
            voteCounts: proposal?.getVoteCounts(),
            stage: proposal?.getStage()
        )
      }
      
      pub struct Proposal {
          pub let ref: &Vote.Proposal{Vote.ProposalPublic}?
          pub let votes: {Address: UInt8}?
          pub let voteCounts: {UInt8: [Address]}?
          pub let stage: UInt8?
      
          init(ref: &Vote.Proposal{Vote.ProposalPublic}?, votes: {Address: UInt8}?, voteCounts: {UInt8: [Address]}?, stage: Vote.Stage?) {
              self.ref = ref
              self.votes = votes
              self.voteCounts = voteCounts
              self.stage = stage?.rawValue
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

  return (
    <div className='flex justify-center pt-20'>
      <div className='w-[80%] space-y-6'>
        <div className='flex mb-12 justify-between'>
          <div>
            <h1 className='text-gray-200 text-3xl font-bold'>{proposal.ref.name}</h1>
            <p className='text-gray-300 opacity-75'>Proposal submitted by: {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}</p>
            <p className='text-gray-300 opacity-75'>Start date: {new Date(proposal.ref.startTime * 1000).toLocaleString()}</p>
            <p className='text-gray-300 opacity-75'>End date: {new Date(proposal.ref.endTime * 1000).toLocaleString()}</p>
          </div>

          <div className='text-gray-400 text-lg font-semibold pr-2'>
            <p>For: {proposal.voteCounts['0']?.length}</p>
            <p>Against: {proposal.voteCounts['1']?.length}</p>
            <p>Abstain: {proposal.voteCounts['2']?.length}</p>
          </div>
        </div>
        <div className='flex items-center justify-between mb-7'>
          <h1 className='text-gray-200 text-2xl font-bold'>Proposal:</h1>
          {proposal.stage == 1 ?
            <div className='space-x-4'>
              {!proposal.votes[user.addr] ?
                <>
                  <button className='rounded-lg font-semibold text-md py-2 px-6 text-white bg-green-500' onClick={() => castVote("for")}>For</button>
                  <button className='rounded-lg font-semibold text-md py-2 px-6 text-white bg-red-500' onClick={() => castVote("against")}>Against</button>
                  <button className='rounded-lg font-semibold text-md py-2 px-6 bg-gray-300' onClick={() => castVote("abstain")}>Abstain</button>
                </> :
                proposal.votes[user.addr] == 0 ?
                  <p className="font-semibold rounded-lg text-md py-2 px-6 text-white bg-green-500">You voted: For</p> :
                  proposal.votes[user.addr] == 1 ?
                    <p className="font-semibold rounded-lg text-md py-3 px-6 text-white bg-red-500">You voted: Against</p> :
                    <p className="font-semibold rounded-lg text-md py-2 px-6 text-gray-800 bg-gray-300">You voted: Abstain</p>
              }
            </div> : <p className='text-gray-300 border rounded-lg px-4 py-2'>Proposal is yet to start</p>}
        </div>
        <div className='rounded-lg bg-none text-white flex items-center justify-center'>
          <img src={`https://nftstorage.link/ipfs/${proposal.ref.image}`} />
        </div>
        <div className='text-gray-300 opacity-75 text-lg'>
          {proposal.ref.description}
        </div>
        <div className="flex space-x-9 pt-10">
          <div className="border h-64 px-5 py-3 rounded-xl w-1/3 text-white text-center overflow-auto">
            <h1 className="mb-4 text-2xl font-semibold">FOR</h1>
            <div className="text-center space-y-2">
              {proposal.voteCounts[0]?.map((vote, i) => (
                <p key={i} className="text-[#38E8C6] text-lg">{vote}</p>
              ))}
            </div>
          </div>
          <div className="border h-64 px-5 py-3 rounded-xl w-1/3 text-white text-center overflow-auto">
            <h1 className="mb-4 text-2xl font-semibold">AGAINST</h1>
            <div className="text-center space-y-2">
              {proposal.voteCounts[1]?.map((vote, i) => (
                <p key={i} className="text-[#38E8C6] text-lg">{vote}</p>
              ))}
            </div>
          </div>
          <div className="border h-64 px-5 py-3 rounded-xl w-1/3 text-white text-center overflow-auto">
            <h1 className="mb-4 text-2xl font-semibold">ABSTAIN</h1>
            <div className="text-center space-y-2">
              {proposal.voteCounts[2]?.map((vote, i) => (
                <p key={i} className="text-[#38E8C6] text-lg">{vote}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
