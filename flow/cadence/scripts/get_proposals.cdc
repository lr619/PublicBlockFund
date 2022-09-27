import Vote from "../Vote.cdc"

pub fun main(): [Proposal] {
    let answer: [Proposal] = []
    
    let proposals = Vote.getProposals()
    for proposal in proposals {
        answer.append(Proposal(
            ref: proposal,
            votes: proposal?.getVotes(),
            voteCounts: proposal?.getVoteCounts(),
            voteTotals: proposal?.getVoteTotals(),
            stage: proposal?.getStage()
        ))
    }

    return answer
}

pub struct Proposal {
    pub let ref: &Vote.Proposal{Vote.ProposalPublic}?
    pub let votes: {Address: UInt8}?
    pub let voteCounts: {UInt8: {Address: UFix64}}?
    pub let voteTotals: {UInt8: UFix64}?
    pub let stage: UInt8?

    init(ref: &Vote.Proposal{Vote.ProposalPublic}?, votes: {Address: UInt8}?, voteCounts: {UInt8: {Address: UFix64}}?, voteTotals: {UInt8: UFix64}?, stage: Vote.Stage?) {
        self.ref = ref
        self.votes = votes
        self.voteCounts = voteCounts
        self.voteTotals = voteTotals
        self.stage = stage?.rawValue
    }
}