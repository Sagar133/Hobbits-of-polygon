import { ethers } from "ethers";

import Token from '../abis/Gold.json'
import Gameplay from '../abis/Gameplay.json'

let tokenContract
let gameplaycontract
let provider
let signer

const loadWeb3 = () => {

    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()

    console.log(signer);
}


const loadBlockchainData = () => {

    const networkData = Token.networks[65]
    const networkDataGameplay = Gameplay.networks[65]

    //tokenContract = new web3.eth.Contract(Token.abi, networkData.address)
    tokenContract = new ethers.Contract(networkData.address, Token.abi, provider)
    gameplaycontract = new ethers.Contract(networkDataGameplay.address, Gameplay.abi, provider)
}

const faucet = () => {
    loadBlockchainData()
    
    const tokenWithSigner = tokenContract.connect(signer);
    tokenWithSigner.faucet()
}

const enterGamePlay = async () => {
    loadBlockchainData()
    
    const tokenWithSigner = tokenContract.connect(signer);
    const gameplayWithSigner = gameplaycontract.connect(signer);

    let amount = ethers.utils.parseUnits("10", 18);

    console.log(gameplaycontract.address, signer);
    await tokenWithSigner.approve(gameplaycontract.address, amount)
    await tokenWithSigner.transfer(gameplaycontract.address, amount)

    return true;
}

const rewardPlayer = async () => {
    loadBlockchainData()

    const gameplayWithSigner = gameplaycontract.connect(signer);

    let amount = ethers.utils.parseUnits("20", 18);
    await gameplayWithSigner.rewardWinnder()
}
 
export { loadWeb3, faucet, enterGamePlay, rewardPlayer }