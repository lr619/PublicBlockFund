import Vote from "../Vote.cdc"

transaction(
    name: String,
    description: String,
    image: String,
    startTime: UFix64,
    endTime: UFix64
) {

    let Admin: &Vote.Admin

    prepare(signer: AuthAccount) {
        self.Admin = signer.borrow<&Vote.Admin>(from: Vote.AdminPath) ?? panic("This signer is not an Admin and cannot make proposals!")
    }

    execute {
        self.Admin.createProposal(name: name, description: description, image: image, startTime: startTime, endTime: endTime)
    }
}
 