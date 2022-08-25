import Vote from "../Vote.cdc"

pub fun main(): [Proposal] {
    let answer: [Proposal] = []
    
    let proposals = Vote.getProposals()
    for proposal in proposals {
        answer.append(Proposal(
            ref: proposal,
            votes: proposal?.getVotes(),
            voteCounts: proposal?.getVoteCounts(),
            stage: proposal?.getStage()
        ))
    }

    return answer
}

pub struct Proposal {
    pub let ref: &Vote.Proposal{Vote.ProposalPublic}?
    pub let votes: {Address: UInt8}?
    pub let voteCounts: {UInt8: UInt64}?
    pub let stage: UInt8?

    init(ref: &Vote.Proposal{Vote.ProposalPublic}?, votes: {Address: UInt8}?, voteCounts: {UInt8: UInt64}?, stage: Vote.Stage?) {
        self.ref = ref
        self.votes = votes
        self.voteCounts = voteCounts
        self.stage = stage?.rawValue
    }
}