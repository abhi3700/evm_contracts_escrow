# Coverage report

```console
❯ yarn coverage                                                                                                                                                          ⏎
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
    Release
      ✔ Succeeds with releasing amount
      ✔ Reverts with zero id
      ✔ Reverts when the release amount is already released i.e. zero
      ✔ Reverts when caller is not the releaser for an id
      ✔ Reverts when paused


  16 passing (1s)

-------------|----------|----------|----------|----------|----------------|
File         |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------|----------|----------|----------|----------|----------------|
 contracts/  |      100 |    92.86 |      100 |      100 |                |
  Escrow.sol |      100 |    92.86 |      100 |      100 |                |
-------------|----------|----------|----------|----------|----------------|
All files    |      100 |    92.86 |      100 |      100 |                |
-------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
✨  Done in 9.88s.
```
