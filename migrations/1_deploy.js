console.log('here');

const Gold = artifacts.require("Gold");
const Gameplay = artifacts.require("Gameplay");
const GameAlgorithm = artifacts.require("GameAlgorithm");
const NFTTrophy = artifacts.require("NFTTrophy");

module.exports = async function (deployer) {
    await deployer.deploy(Gold)
    let token = await Gold.deployed()

    let gameplay = await deployer.deploy(Gameplay, token.address)

    let gameAlgorithm = await deployer.deploy(
        GameAlgorithm,
        '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255',
        '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
        '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4'
    )

    let rewardNFT = await deployer.deploy(
        NFTTrophy, 
        '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255',
        '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
        '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4'
    )
};
