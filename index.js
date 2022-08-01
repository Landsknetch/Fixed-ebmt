import {ethers} from "./ethers-5.6.esm.min.js"
import {abi, contractAddress} from "./constants.js"

const connectButton = document.getElementById("connectButton")
const transferButton = document.getElementById("transferButton")
const payoffButton = document.getElementById("payoffButton")
const isiformButton = document.getElementById("isiformButton")
connectButton.onclick = connect
transferButton.onclick = transfer
payoffButton.onclick = payoff
isiformButton.onclick = isiform

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

async function transfer()
{
    const ethAmount = document.getElementById("ethAmount").value
    const destination = document.getElementById("destination").value
    console.log("Fund with {ethAmount}")
    if (typeof window.ethereum !== "undefined")
    {
        try
        {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            ethers.utils.getAddress(destination);
            const tx = await signer.sendTransaction({
            to: destination,
            value: ethers.utils.parseEther(ethAmount)
          });
          console.log({ ethAmount, destination });
          console.log("tx", tx);
        }
        catch(error)
        {
            console.log(error)
        }
    }
}

async function isiform()
{
    const lender = document.getElementById("lender").value
    const borrower = document.getElementById("borrower").value
    const loanAmount = document.getElementById("loanAmount").value
    const payoffAmount = document.getElementById("payoffAmount").value
    const loanDuration = document.getElementById("loanDuration").value
    {
        try
        {
          console.log({ lender, borrower, loanAmount, payoffAmount,loanDuration });
        }
        catch(error)
        {
            console.log(error)
        }
    }
}

// async function payoff()
// {
//     const payoffAmount = document.getElementById("payoffAmount").value
//     const lender = document.getElementById("lender").value
//     console.log("Fund with {ethAmount}")
//     if (typeof window.ethereum !== "undefined")
//     {
//         try
//         {
//             const provider = new ethers.providers.Web3Provider(window.ethereum)
//             const signer = provider.getSigner()
//             ethers.utils.getAddress(lender);
//             const tx = await signer.sendTransaction({
//             to: lender,
//             value: ethers.utils.parseEther(payoffAmount)
//           });
//           console.log({ payoffAmount, lender });
//           console.log("tx", tx);
//         }
//         catch(error)
//         {
//             console.log(error)
//         }
//     }
// }


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