# Deployment Details

## Rinkeby Testnet

* Etherscan: <https://rinkeby.etherscan.io/address/0xDda3CF9d2489e8BCC13FaB5a561eE6bC6B674b90>
* Execution

```console
// M-1
❯ npx hardhat run deployment/deploy.ts --network rinkeby                                                                                                                 ⏎
No need to generate any newer typings.
Escrow SC deployed to:  0xDda3CF9d2489e8BCC13FaB5a561eE6bC6B674b90
The transaction that was sent to the network to deploy the escrow contract: 0xf8c1364e1409709f0d3b004658353553de2be38c0dd0bac4c337071a04113565

// M-2
❯ yarn hardhat deploy:Escrow --network rinkeby                                                                                                                ⏎
No need to generate any newer typings.
Escrow SC deployed to:  0xDda3CF9d2489e8BCC13FaB5a561eE6bC6B674b90
The transaction that was sent to the network to deploy the escrow contract: 0xf8c1364e1409709f0d3b004658353553de2be38c0dd0bac4c337071a04113565
```
