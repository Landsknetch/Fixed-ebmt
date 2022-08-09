import {Contract, ethers} from "./ethers-5.6.esm.min.js"
import {abi, contractAddress} from "./constants.js"

const connectButton = document.getElementById("connectButton")
const transferButton = document.getElementById("transferButton")
connectButton.onclick = connect
transferButton.onclick = transfer

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
    if (typeof window.ethereum !== "undefined")
    {
        try
        {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            ethers.utils.getAddress(destination);

            performance.mark('transfer:start');
            //Form Send Start
            const txhash = await signer.sendTransaction
            ({
                to: destination,
                value: ethers.utils.parseEther(ethAmount),
            });
            // Record the time immediately after running a task.
            performance.mark('transfer:end');
            // Measure the delta between the start and end of the task
            performance.measure('transfer', 'transfer:start', 'transfer:end');
            console.log(performance)
            const entries = performance.getEntriesByType("mark");
            for (const entry of entries) {
            console.table(entry.toJSON());
            }
          console.log({ ethAmount, destination,});
          console.log("tx", txhash);
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
