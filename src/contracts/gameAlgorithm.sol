// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// const RINKEBY_VRF_COORDINATOR = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B'
// const RINKEBY_LINKTOKEN = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709'
// const RINKEBY_KEYHASH = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'

// matic link = 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
// matic vrf = 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
// matic keyhash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./link/VRFConsumerBase.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {SafeMath} from "./utils/SafeMath.sol";

contract GameAlgorithm is VRFConsumerBase {
    using SafeMath for uint256;
    using Strings for string;
    
    bytes32 public keyHash;
    address public VRFCoordinator;
    uint256 internal fee;
    uint256 public randomResult;
    address public Linktoken;
    uint256 public totalGameplay;

    constructor(
        address _VRFCoordinator,
        address _LinkToken,
        bytes32 _keyHash
    )
        public
        VRFConsumerBase(_VRFCoordinator, _LinkToken)
    {
        VRFCoordinator = _VRFCoordinator;
        keyHash = _keyHash;
        Linktoken = _LinkToken;
        fee = 0.1 * 10**18; // 0.1 LINK
        totalGameplay = 0;
    }

    function setGameAlgo() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        totalGameplay = totalGameplay.add(1);
        return requestRandomness(keyHash, fee, totalGameplay);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }

    function getGameAlgo() public view returns (uint256) {
        return randomResult;
    }

    function sqrt(uint256 x) internal view returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}