import Vote from "../Vote.cdc"

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
 