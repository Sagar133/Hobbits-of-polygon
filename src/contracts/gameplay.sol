pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Gameplay {
    IERC20 public tokenAddress;
    mapping(address => uint256) gameplayLedger;
    mapping(address => uint256) playersClaim;
    
    constructor (IERC20 _address) {
       tokenAddress = _address; 
    }
    
    function entryTicket(uint256 _amount) public payable {
        tokenAddress.transferFrom(msg.sender, address(this), _amount);
        gameplayLedger[msg.sender] = gameplayLedger[msg.sender] + _amount;
    }
    
    // need to add IPFS data mapping for access control
    function rewardWinnder() public payable {
        tokenAddress.transfer(msg.sender, 20000000000000000000);
    }
}