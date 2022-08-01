import {ethers} from "./ethers-5.6.esm.min.js"
import {abi, contractAddress} from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const withdrawBtn = document.getElementById("withdrawButton")
connectButton.onclick = connect
fundButton.onclick = fund

console.log(ethers)
console.log(abi)
console.log(contractAddress)

async function connect()
{
    if (typeof window.ethereum !== "undefined")
    {
        await window.ethereum.request({method: "eth_requestAccounts"})
        connectButton.innerHTML = "Connected with MEtamask"
    }
    else
    {
        connectButton.innerHTML = "Please Install MEtamask"
    }
}

async function fund()
{
    const ethAmount = "0.1"
    console.log('Fund with ${ethAmount}...')
    if (typeof window.ethereum !== "undefined")
    {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try
        {
            const transactionResponse = await contract.deposit({value : ethers.utils.parseEther(ethAmount) })
            await WaitingResponse(transactionResponse, provider)
        }
        catch(error)
        {
            console.log(error)
        }
    }
}

function WaitingResponse(transactionResponse, provider)
{
    return new Promise((resolve, reject) =>
    {
        console.log('Mining ${transaction.hash}...')
        provider.once(transactionResponse.hash, (transactionReceipt) =>
        {
            console.log('Completed ${transactionReceipt.confirmation} confirmation')
        })
        resolve()
    })
}

// async function withdraw(){
//     if(typeof window.ethereum)
// }