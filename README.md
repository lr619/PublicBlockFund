# Blockfund
THIS IS A PUBLIC VERSION OF MY REPO. PLEASE REPLACE ALL API KEYS WITH YOUR OWN PRIVATE ONES
## To build our contract we decided to follow Flow Blockchains Quickstart Voting app.

Deploy a Voting contract to learn the basics of voting inside of a DAO on the Flow blockchain and Cadence. You'll use:
- The local Flow emulator to deploy smart contracts. 
- The local Flow dev wallet to log into test accounts.
- A template Next.js app with sample scripts and transactions to interact with your contract.
### What we did to change the app was to include our own deposit strucutre. Additionally we choose to remove the options for users to vote against or abstain and instead coverted our vote mechanism into a deposite mechanism for crowd funding

## Running our website
#### Terminal 1
- ensure that you have Flow CLI installed. Please refer to the [Flow CLI Installation Guide](https://developers.flow.com/tools/flow-cli/install). Please note Windows installation is currently bugged up. Only Mac or Linux works. You can run Flow CLI off of WSL 2
```sh
npm install
npm run dev
```
#### Terminal 2
start flow with transactions visible
```sh
flow emulater start -v
```
#### Termminal 3
```sh
flow project deploy
flow dev-wallet
```

