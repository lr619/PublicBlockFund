import Vote from "../Vote.cdc"
import ExampleToken from "../ExampleToken.cdc"
import FungibleToken from "../utility/FungibleToken.cdc"

transaction(proposalId: UInt64, vote: String) {

    let Identity: &Vote.Identity
    let Vault: &ExampleToken.Vault{FungibleToken.Balance}

    prepare(signer: AuthAccount) {
        // Only setup an identity if they haven't set up already.
        if signer.borrow<&Vote.Identity>(from: Vote.IdentityStoragePath) == nil {
            // Create a new Identity (to cast votes) and put it in storage
            signer.save(<- Vote.createIdentity(), to: Vote.IdentityStoragePath)
        }

        self.Identity = signer.borrow<&Vote.Identity>(from: Vote.IdentityStoragePath)!
        self.Vault = signer.getCapability(ExampleToken.VaultBalancePath)
                        .borrow<&ExampleToken.Vault{FungibleToken.Balance}>()
                        ?? panic("The user has not set up a Vault yet, so they cannot vote.")
    }

    pre {
        vote == "for" || vote == "against" || vote == "abstain": "This is not a valid voting option."
        self.Vault.balance > 0.0: "You must have a balance greater than 0 to vote."
    }

    execute {
        let decision = vote == "for" ? Vote.Decision.for : vote == "against" ? Vote.Decision.against : Vote.Decision.abstain
        self.Identity.castBallot(proposalId: proposalId, decision: decision, vault: self.Vault)
    }
}
 