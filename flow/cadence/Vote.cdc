pub contract Vote {

    pub let IdentityStoragePath: StoragePath
    pub let IdentityPublicPath: PublicPath
    pub let AdminPath: StoragePath

    pub let proposals: @{UInt64: Proposal}

    pub enum Decision: UInt8 {
        pub case for
        pub case against
        pub case abstain
    }

    pub enum Stage: UInt8 {
        pub case notStarted
        pub case pending
        pub case ended
    }
    
    pub resource interface ProposalPublic {
        pub let name: String
        pub let description: String
        pub let image: String
        pub let startTime: UFix64
        pub let endTime: UFix64
        pub fun getVotes(): {Address: UInt8}
        pub fun getVoteCounts(): {UInt8: [Address]}
        pub fun getStage(): Stage
    }

    pub resource Proposal: ProposalPublic {
        pub let name: String
        pub let description: String
        // hash of the image, which is stored on IPFS
        pub let image: String
        pub let startTime: UFix64
        pub let endTime: UFix64

        access(self) let votes: {Address: UInt8}
        access(self) let voteCounts: {UInt8: [Address]}

        access(contract) fun vote(user: Address, decision: Decision) {
            pre {
                !self.votes.containsKey(user): "This user has already voted!"
                getCurrentBlock().timestamp >= self.startTime && 
                getCurrentBlock().timestamp <= self.endTime: "This vote is not ready to vote on yet."
            }
            self.votes[user] = decision.rawValue
            self.voteCounts[decision.rawValue]!.append(user)
        }

        pub fun getVotes(): {Address: UInt8} {
            return self.votes
        }

        pub fun getVoteCounts(): {UInt8: [Address]} {
            return self.voteCounts
        }

        pub fun getStage(): Stage {
            let currentTime: UFix64 = getCurrentBlock().timestamp
            if currentTime < self.startTime {
                return Stage.notStarted
            } else if currentTime > self.endTime {
                return Stage.ended
            }
            return Stage.pending
        }

        init(name: String, description: String, image: String, startTime: UFix64, endTime: UFix64) {
            self.name = name
            self.description = description
            self.image = image
            self.startTime = startTime
            self.endTime = endTime
            self.votes = {}
            self.voteCounts = { Decision.for.rawValue: [], Decision.against.rawValue: [], Decision.abstain.rawValue: [] }
        }
    }

    pub resource Identity {

        pub fun castBallot(proposalId: UInt64, decision: Decision) {
            let proposal = (&Vote.proposals[proposalId] as &Proposal?) ?? panic("This proposal does not exist!")
            proposal.vote(user: self.owner!.address, decision: decision)
        }

    }

    pub fun createIdentity(): @Identity {
        return <- create Identity()
    }

    pub resource Admin {
        pub fun createProposal(name: String, description: String, image: String, startTime: UFix64, endTime: UFix64) {
            let proposal <- create Proposal(name: name, description: description, image: image, startTime: startTime, endTime: endTime)
            Vote.proposals[proposal.uuid] <-! proposal
        }
    }

    pub fun getProposal(proposalId: UInt64): &Proposal{ProposalPublic}? {
        return &self.proposals[proposalId] as &Proposal{ProposalPublic}?
    }

    pub fun getProposals(): [&Proposal{ProposalPublic}?] {
        let answer: [&Proposal{ProposalPublic}?] = []
        for proposalId in self.proposals.keys {
            answer.append(self.getProposal(proposalId: proposalId))
        }
        return answer
    }

    init() {
        self.IdentityStoragePath = /storage/VoteIdentity
        self.IdentityPublicPath = /public/VoteIdentity
        self.AdminPath = /storage/VoteAdmin
        self.proposals <- {}
        self.account.save(<- create Admin(), to: self.AdminPath)
    }

}
 