# evm_contracts_escrow

Escrow contract for EVM Blockchains

## About

* It's an Escrow contract.
* [Instruction](./instruction.md).
* Get the coverage report [here](./reports.md#coverage).
* The Escrow SC is deployed in Rinkeby testnet. Check the details [here](./reports.md#deployment)
* The Escrow SC is verified in Rinkeby testnet. Check the details [here](./reports.md#verify)

## Installation

```console
yarn install
```

## Usage

### Build

```console
yarn compile
```

### Test

```console
yarn test
```

### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```console
yarn typechain
```

### Lint Solidity

Lint the Solidity code:

```console
yarn lint:sol
```

### Lint TypeScript

Lint the TypeScript code:

```console
yarn lint:ts
```

### Coverage

Generate the code coverage report:

```console
yarn coverage
```

### Report Gas

See the gas usage per unit test and averate gas per method call:

```console
REPORT_GAS=true yarn test
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```console
yarn clean
```

### Deploy

#### localhost

```console
// on terminal-1
$ npx hardhat node

// on terminal-2
$ yarn hardhat deploy:Escrow --network localhost
```

#### ETH Testnet - Rinkeby

* Environment variables: Create a `.env` file with its values in [.env.example](./.env.example)
* Deploy the contracts

```console
yarn hardhat deploy:Escrow --network rinkeby
```

#### ETH Mainnet

* Environment variables: Create a `.env` file with its values in [.env.example](./.env.example)
* Deploy the contracts

```console
yarn hardhat deploy:Escrow --network mainnet
```
