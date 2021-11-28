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

const rewardNFT = async () => {
    const nftrewardWithSigner = nftReward.connect(signer);
    let account = await signer.getAddress() 
    //console.log('account', account);
     
    const nftMint = ["https://ipfs.io/ipfs/QmPbBTESpMSsGjKisM73deE3PLqA76s2zh1nHhvAkAfYf4?filename=btc.png", "https://ipfs.io/ipfs/Qmb3jBv3xdDettAQokTxQc5T4G1buxY9oxRiSA9YepeRrP?filename=crystal.png", "https://ipfs.io/ipfs/QmZg13ohhyY9xBYnhF1XbAm8qjW43SjxDXsXTyTGFkezWX?filename=chest.png", "https://ipfs.io/ipfs/QmNyZd4czMAY8rxYjGK6b8SR69m2W9FHbkVsnCJstewkXY?filename=god.png", "https://ipfs.io/ipfs/QmXHYB8eEpEQjZq6Hc9vCHdPGwpHPjZfoRYQNwqNZVsKQ8?filename=diamond.png"]
    const random = Math.floor(Math.random() * nftMint.length);
    await nftrewardWithSigner.requestNewRandomTrophy(
        1,
        'Hobbits-of-polygon',
        1,
        account,
        nftMint[random]
    )
}

const getAlgoRandomness = async () => {
    loadBlockchainData()
    const gamealgoWithSigner = gameAlgo.connect(signer);

    let algoNumb = await gamealgoWithSigner.setGameAlgo()
    console.log('algoNumb', algoNumb);

    if (algoNumb) {
        let numb = await gamealgoWithSigner.getGameAlgo()
        console.log('numb', numb);
        return numb
    } else {
        return false
    }
    // return algoNumb
}
 
export { loadWeb3, faucet, enterGamePlay, rewardPlayer, getAlgoRandomness, rewardNFT }