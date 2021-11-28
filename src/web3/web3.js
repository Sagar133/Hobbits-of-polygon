import { ethers } from "ethers";

import Token from '../abis/Gold.json'
import Gameplay from '../abis/Gameplay.json'
import GameAlgo from '../abis/GameAlgorithm.json'
import Nftreward from '../abis/NFTTrophy.json'

let tokenContract
let gameplaycontract
let nftReward
let gameAlgo
let provider
let signer

const loadWeb3 = () => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()

    console.log('signer', signer);
}


const loadBlockchainData = () => {
    // Okex
    // const networkData = Token.networks[65]
    // const networkDataGameplay = Gameplay.networks[65]

    const networkData = Token.networks[80001]
    const networkDataGameplay = Gameplay.networks[80001]
    const networkDataGameAlgo = GameAlgo.networks[80001]
    const networkDataNftreward = Nftreward.networks[80001]

    //tokenContract = new web3.eth.Contract(Token.abi, networkData.address)
    tokenContract = new ethers.Contract(networkData.address, Token.abi, provider)
    gameplaycontract = new ethers.Contract(networkDataGameplay.address, Gameplay.abi, provider)
    nftReward = new ethers.Contract(networkDataNftreward.address, Nftreward.abi, provider)
    gameAlgo = new ethers.Contract(networkDataGameAlgo.address, GameAlgo.abi, provider)
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

const getAlgoRandomness = async () => {
    loadBlockchainData()
    const gamealgoWithSigner = gameAlgo.connect(signer);

    let algoNumb = await gamealgoWithSigner.setGameAlgo()
    console.log('algoNumb', algoNumb);

    if (algoNumb) {
        return await gamealgoWithSigner.getGameAlgo()
    } else {
        return false
    }
    // return algoNumb
}
 
export { loadWeb3, faucet, enterGamePlay, rewardPlayer, getAlgoRandomness }