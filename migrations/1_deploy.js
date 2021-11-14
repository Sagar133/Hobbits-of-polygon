console.log('here');

const Gold = artifacts.require("Gold");
const Gameplay = artifacts.require("Gameplay");

module.exports = async function (deployer) {
    await deployer.deploy(Gold)
    let token = await Gold.deployed()

    console.log(token);
    let gameplay = await deployer.deploy(Gameplay, token.address)
};
