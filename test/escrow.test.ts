import { ethers } from "hardhat";
import chai from "chai";
import {
  /* BigNumber, */ Contract /* , Signer */ /* , Wallet */,
} from "ethers";
import { /* deployContract, */ solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  // MAX_UINT256,
  // TIME,
  ZERO_ADDRESS,
  // asyncForEach,
  // deployContractWithLibraries,
  // getCurrentBlockTimestamp,
  // getUserTokenBalance,
  // getUserTokenBalances,
  // setNextTimestamp,
  // setTimestamp,
} from "./testUtils";

chai.use(solidity);
const { expect } = chai;

export function testEscrow(): void {
  describe("Escrow contract", () => {
    // let escrowContractAddress: string;
    // let signers: Array<Signer>;
    let owner: SignerWithAddress,
      owner2: SignerWithAddress,
      addr1: SignerWithAddress,
      addr2: SignerWithAddress,
      addr3: SignerWithAddress,
      addr4: SignerWithAddress;
    let escrowContract: Contract;
    let escrowId: Number;

    beforeEach(async () => {
      // get signers
      [owner, owner2, addr1, addr2, addr3, addr4] = await ethers.getSigners();

      // ---------------------------------------------------
      // deploy escrow contract
      const EscrowFactory = await ethers.getContractFactory("Escrow");
      escrowContract = await EscrowFactory.deploy();
      await escrowContract.deployed();
      // escrowContractAddress = escrowContract.address;
      // console.log(`Escrow contract address: ${escrowContract.address}`);

      // expect(escrowContractAddress).to.not.eq(0);

      // console.log(`Escrow SC owner: ${await escrowContract.owner()}`);
    });

    describe("Ownable", async () => {
      it("Should have the correct owner", async () => {
        expect(await escrowContract.owner()).to.equal(owner.address);
      });

      it("Owner is able to transfer ownership", async () => {
        await expect(escrowContract.transferOwnership(owner2.address))
          .to.emit(escrowContract, "OwnershipTransferred")
          .withArgs(owner.address, owner2.address);
      });
    });

    describe("Pausable", async () => {
      it("Owner is able to pause when NOT paused", async () => {
        await expect(escrowContract.pause())
          .to.emit(escrowContract, "Paused")
          .withArgs(owner.address);
      });

      it("Owner is able to unpause when already paused", async () => {
        escrowContract.pause();

        await expect(escrowContract.unpause())
          .to.emit(escrowContract, "Unpaused")
          .withArgs(owner.address);
      });

      it("Owner is NOT able to pause when already paused", async () => {
        escrowContract.pause();

        await expect(escrowContract.pause()).to.be.revertedWith(
          "Pausable: paused"
        );
      });

      it("Owner is NOT able to unpause when already unpaused", async () => {
        escrowContract.pause();

        escrowContract.unpause();

        await expect(escrowContract.unpause()).to.be.revertedWith(
          "Pausable: not paused"
        );
      });
    });

    describe("Deposit For", async () => {
      it("Succeeds with depositing amount", async () => {
        // addr1 transfer 3 wei to contract
        await expect(
          escrowContract
            .connect(addr1)
            .depositFor(addr2.address, addr3.address, { value: 3 })
        )
          .to.emit(escrowContract, "DepositedFor")
          .withArgs(addr1.address, addr2.address, addr3.address, 3);

        const escrowId = await escrowContract.getEscrowId();
        await expect(escrowId).to.eq(1);
      });

      it("Reverts with zero amount", async () => {
        // addr1 transfer 0 wei to contract
        await expect(
          escrowContract
            .connect(addr1)
            .depositFor(addr2.address, addr3.address, { value: 0 })
        ).to.be.revertedWith("transfer non-zero ether");

        const escrowId = await escrowContract.getEscrowId();
        await expect(escrowId).to.eq(0);
      });

      it("Reverts with zero payee", async () => {
        // addr1 transfer 1 wei to contract with zero payee
        await expect(
          escrowContract
            .connect(addr1)
            .depositFor(ZERO_ADDRESS, addr3.address, { value: 1 })
        ).to.be.revertedWith("payee must be non-zero");

        const escrowId = await escrowContract.getEscrowId();
        await expect(escrowId).to.eq(0);
      });

      it("Reverts with zero releaser", async () => {
        // addr1 transfer 1 wei to contract with zero payee
        await expect(
          escrowContract
            .connect(addr1)
            .depositFor(addr2.address, ZERO_ADDRESS, { value: 1 })
        ).to.be.revertedWith("releaser must be non-zero");

        const escrowId = await escrowContract.getEscrowId();
        await expect(escrowId).to.eq(0);
      });

      it("Reverts when paused", async () => {
        escrowContract.pause();

        // addr1 transfer 1 wei to contract
        await expect(
          escrowContract
            .connect(addr1)
            .depositFor(addr2.address, addr3.address, { value: 3 })
        ).to.be.revertedWith("Pausable: paused");

        const escrowId = await escrowContract.getEscrowId();
        await expect(escrowId).to.eq(0);
      });
    });

    describe("Release", async () => {
      beforeEach(async () => {
        // addr1 transfer 3 wei to contract
        await expect(
          escrowContract
            .connect(addr1)
            .depositFor(addr2.address, addr3.address, { value: 3 })
        )
          .to.emit(escrowContract, "DepositedFor")
          .withArgs(addr1.address, addr2.address, addr3.address, 3);

        escrowId = await escrowContract.getEscrowId();
      });

      it("Succeeds with releasing amount", async () => {
        // payee's balance before release
        const provider = ethers.provider;
        const balanceInEthBefore = await provider.getBalance(addr2.address);

        // addr3 release amount to payee
        await expect(escrowContract.connect(addr3).release(escrowId))
          .to.emit(escrowContract, "Released")
          .withArgs(addr2.address, addr3.address, 3);

        // payee's balance after release
        const balanceInEthAfter = await provider.getBalance(addr2.address);

        // verify the payee's balance is increased by 3 wei
        await expect(balanceInEthAfter.sub(balanceInEthBefore)).to.eq(3);
      });

      it("Reverts with zero id", async () => {
        // addr1 transfer 0 wei to contract
        await expect(
          escrowContract.connect(addr3).release(0)
        ).to.be.revertedWith("escrow id must be positive");
      });

      it("Reverts when the release amount is already released i.e. zero", async () => {
        // addr3 release amount to payee
        await expect(escrowContract.connect(addr3).release(escrowId))
          .to.emit(escrowContract, "Released")
          .withArgs(addr2.address, addr3.address, 3);

        // addr3 again tries to release
        await expect(
          escrowContract.connect(addr3).release(escrowId)
        ).to.be.revertedWith("No amount to release");
      });

      it("Reverts when caller is not the releaser for an id", async () => {
        // Someone else release amount to payee
        await expect(
          escrowContract.connect(addr4).release(escrowId)
        ).to.be.revertedWith("Caller must be releaser");
      });

      it("Reverts when paused", async () => {
        escrowContract.pause();

        // addr3 release amount to payee
        await expect(
          escrowContract.connect(addr3).release(escrowId)
        ).to.be.revertedWith("Pausable: paused");
      });
    });
  });
}
