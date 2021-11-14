pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Gold is ERC20 {

    constructor () ERC20("GOLD", "GLD") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
    
    function faucet() public {
        _mint(msg.sender, 100 * (10 ** uint256(decimals())));
    }
}