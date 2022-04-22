// import { ethers } from "hardhat";
// import { Contract, ContractFactory /* , BigNumber */ } from "ethers";
// import { config as dotenvConfig } from "dotenv";
// import { resolve } from "path";
// dotenvConfig({ path: resolve(__dirname, "./.env") });

// async function main(): Promise<void> {
//   // ==============================================================================
//   // We get the escrow contract to deploy
//   const EscrowFactory: ContractFactory = await ethers.getContractFactory(
//     "Escrow"
//   );
//   const escrowC: Contract = await EscrowFactory.deploy();
//   await escrowC.deployed();
//   console.log("Escrow SC deployed to: ", escrowC.address);
//   console.log(
//     `The transaction that was sent to the network to deploy the escrow contract: ${escrowC.deployTransaction.hash}`
//   );
// }

// // // We recommend this pattern to be able to use async/await everywhere
// // // and properly handle errors.
// main()
//   .then(() => new Error("Exit: 0"))
//   .catch((error: Error) => {
//     console.error(error);
//     // process.exit(1);
//     throw new Error("Exit: 1");
//   });

// M-2
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { Contract, ContractFactory /* , BigNumber */ } from "ethers";

task("deploy:Escrow", "Deploy Escrow Contract").setAction(async function (
  taskArguments: TaskArguments,
  { ethers }
) {
  // We get the escrow contract to deploy
  const EscrowFactory: ContractFactory = await ethers.getContractFactory(
    "Escrow"
  );
  const escrowC: Contract = await EscrowFactory.deploy();
  await escrowC.deployed();
  console.log("Escrow SC deployed to: ", escrowC.address);
  console.log(
    `The transaction that was sent to the network to deploy the escrow contract: ${escrowC.deployTransaction.hash}`
  );
});
