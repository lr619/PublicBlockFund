import Vote from "../Vote.cdc"
import Multisign from "../Multisign.cdc"


transaction(
    name: String,
    description: String,
    image: String,
    startTime: UFix64,
    endTime: UFix64,
    treasuryAddress: Address, 
    amount: UFix64, 
    transferTo: Address
) {

    let MyTreasury: &Multisign.Treasury

    prepare(signer: AuthAccount) {
        if signer.borrow<&Multisign.Treasury>(from: Multisign.TreasuryStoragePath) == nil {
            signer.save(<- Multisign.createTreasury(admins: [signer.address]), to: Multisign.TreasuryStoragePath)
            signer.link<&Multisign.Treasury{Multisign.TreasuryPublic}>(Multisign.TreasuryPublicPath, target: Multisign.TreasuryStoragePath)
       }
       self.MyTreasury = signer.borrow<&Multisign.Treasury>(from: Multisign.TreasuryStoragePath)!
        
    }

    execute {
      self.MyTreasury.proposeProposal(
        treasuryAddress: treasuryAddress, 
        amount: amount, 
        description: description,
        transferTo: transferTo
      )
    }
}
 