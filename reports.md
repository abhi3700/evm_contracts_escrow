# Reports

## Coverage

```console
❯ yarn coverage
yarn run v1.22.18
$ hardhat coverage --solcoverjs ./.solcover.js --temp build --network hardhat

Version
=======
> solidity-coverage: v0.7.20

Instrumenting for coverage...
=============================

> Escrow.sol

Compilation:
============

Generating typings for: 7 artifacts in dir: ./build/typechain/ for target: ethers-v5
Successfully generated 9 typings!
Compiled 7 Solidity files successfully

Network Info
============
> HardhatEVM: v2.9.3
> network:    hardhat

No need to generate any newer typings.


  Escrow contract
    Ownable
      ✔ Should have the correct owner
      ✔ Owner is able to transfer ownership
    Pausable
      ✔ Owner is able to pause when NOT paused
      ✔ Owner is able to unpause when already paused
      ✔ Owner is NOT able to pause when already paused
      ✔ Owner is NOT able to unpause when already unpaused
    Deposit For
      ✔ Succeeds with depositing amount
      ✔ Reverts with zero amount
      ✔ Reverts with zero payee
      ✔ Reverts with zero releaser
      ✔ Reverts when paused
    Refund
      ✔ Succeeds with refund amount
      ✔ Reverts with zero id
      ✔ Reverts when the release amount is already released i.e. zero (45ms)
      ✔ Reverts when caller is not the releaser for an id
      ✔ Reverts when paused
    Release
      ✔ Succeeds with releasing amount
      ✔ Reverts with zero id
      ✔ Reverts when the release amount is already released i.e. zero (42ms)
      ✔ Reverts when caller is not the releaser for an id
      ✔ Reverts when paused


  21 passing (2s)

-------------|----------|----------|----------|----------|----------------|
File         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------|----------|----------|----------|----------|----------------|
 contracts/  |      100 |    90.91 |      100 |      100 |                |
  Escrow.sol |      100 |    90.91 |      100 |      100 |                |
-------------|----------|----------|----------|----------|----------------|
All files    |      100 |    90.91 |      100 |      100 |                |
-------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
✨  Done in 10.38s.
```

## Deployment

```console
// M-1
❯ npx hardhat run deployment/deploy.ts --network rinkeby                                                                                                                 ⏎
No need to generate any newer typings.
Escrow SC deployed to:  0x2B75cc9Bc375b53BbD86CbAFEB4CAd258E5bd7E5
The transaction that was sent to the network to deploy the escrow contract: 0x0565479b1a79295b809d0301351a4b9755fa1eb03300f3c91c0f41ec1b11c65e

// M-2
❯ yarn hardhat deploy:Escrow --network rinkeby
yarn run v1.22.18
$ /Users/abhi3700/F/coding/github_repos/evm_contracts_escrow/node_modules/.bin/hardhat deploy:Escrow --network rinkeby
Escrow SC deployed to:  0x2B75cc9Bc375b53BbD86CbAFEB4CAd258E5bd7E5
The transaction that was sent to the network to deploy the escrow contract: 0x0565479b1a79295b809d0301351a4b9755fa1eb03300f3c91c0f41ec1b11c65e
✨  Done in 7.02s.
```

## Verify

```console
❯ yarn verify rinkeby 0x2B75cc9Bc375b53BbD86CbAFEB4CAd258E5bd7E5
yarn run v1.22.18
$ hardhat verify --network rinkeby 0x2B75cc9Bc375b53BbD86CbAFEB4CAd258E5bd7E5
Nothing to compile
No need to generate any newer typings.
Successfully submitted source code for contract
contracts/Escrow.sol:Escrow at 0x2B75cc9Bc375b53BbD86CbAFEB4CAd258E5bd7E5
for verification on Etherscan. Waiting for verification result...

Successfully verified contract Escrow on Etherscan.
https://rinkeby.etherscan.io/address/0x2B75cc9Bc375b53BbD86CbAFEB4CAd258E5bd7E5#code
✨  Done in 35.69s.
```
