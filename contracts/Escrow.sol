// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "hardhat/console.sol";

/// @title A Escrow contract for Ether token
/// @author abhi3700
/// @notice An escrow contract with deposit & release of Ether
/// @dev An escrow contract with deposit & release of Ether where payer deposits & releaser releases the amount
contract Escrow is Ownable, Pausable, ReentrancyGuard {
    using SafeMath for uint256;

    // ==========State variables====================================
    struct EscrowDetails {
        uint256 amount;
        address payer;
        address payee;
        address releaser;
    }

    // mapping(id => EscrowDetails)
    mapping(uint256 => EscrowDetails) public escrowMap;

    // public id
    uint256 public escrowId;

    // ==========Events=============================================
    event DepositedFor( address indexed payer, address indexed payee, address releaser, uint256 amount);
    event Released( address indexed payee, address indexed releaser, uint256 amount);
    event Refunded( address indexed payer, address indexed releaser, uint256 amount);

    // ==========Constructor========================================
    // constructor() {}

    // ==========Functions==========================================
    /// @notice Deposit Amount as Escrow
    /// @dev payer deposit amount for releaser, payee
    /// @param _payee one who receive the amount
    /// @param _releaser one who release the amount
    function depositFor(address _payee, address _releaser) external payable whenNotPaused {

        require(msg.value > 0, "transfer non-zero ether");
        require(_payee != address(0), "payee must be non-zero");
        require(_releaser != address(0), "releaser must be non-zero");

        // increment the id
        escrowId = escrowId.add(1);

        // store the info
        escrowMap[escrowId].amount = msg.value;
        escrowMap[escrowId].payer = _msgSender();
        escrowMap[escrowId].payee = _payee;
        escrowMap[escrowId].releaser = _releaser;

        emit DepositedFor(_msgSender(), _payee, _releaser, msg.value);
    }

    // -------------------------------------------------------------
    function refund(uint256 _id) external whenNotPaused nonReentrant {
        require(_id > 0, "escrow id must be positive");

        EscrowDetails memory info = escrowMap[_id];
        require(info.amount > 0, "No amount for refund");
        require(info.releaser == _msgSender(), "Caller must be releaser");

        escrowMap[_id].amount = 0;

        (bool success, ) = info.payer.call{value: info.amount}(new bytes(0));
        require(success, "Transfer failed.");

        emit Refunded(info.payer, info.releaser, info.amount);
    }

    // -------------------------------------------------------------
    /// @notice Release Amount from Escrow
    /// @dev releaser release amount to payee
    /// @param _id escrow id
    function release(uint256 _id) external whenNotPaused nonReentrant {

        require(_id > 0, "escrow id must be positive");
        
        EscrowDetails memory info = escrowMap[_id];
        // console.log("releasable amount: ", info.amount);
        require(info.amount > 0, "No amount to release");
        require(info.releaser == _msgSender(), "Caller must be releaser");

        escrowMap[_id].amount = 0;
        
        (bool success, ) = info.payee.call{value: info.amount}(new bytes(0));
        require(success, "Transfer failed.");

        emit Released(info.payee, info.releaser, info.amount);
    }

    // ------------------------------------------------------------------------------------------
    // View functions

    function getEscrowId() public view returns (uint256) {
        return escrowId;
    }

    // function getReleasableAmt(uint256 _id) public view returns (uint256) {
    //     return escrowMap[_id].amount;
    // }

    // ------------------------------------------------------------------------------------------
    /// @notice Pause contract 
    function pause() public onlyOwner whenNotPaused {
        _pause();
    }

    /// @notice Unpause contract
    function unpause() public onlyOwner whenPaused {
        _unpause();
    }


}