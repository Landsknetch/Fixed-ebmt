import {Contract, ethers} from "./ethers-5.6.esm.min.js"
import {abi, contractAddress} from "./constants.js"

const connectButton = document.getElementById("connectButton")
const isiformButton = document.getElementById("isiformButton")
connectButton.onclick = connect
isiformButton.onclick = isiform

console.log(ethers)
console.log(abi)
console.log(contractAddress)

async function connect()
{
    if (typeof window.ethereum !== "undefined")
    {
        // Record the time immediately before running a task.
        performance.mark('myTask:start');
        //Connection Task Begin
        await window.ethereum.request({method: "eth_requestAccounts"})
        connectButton.innerHTML = "Connected with MEtamask"
        // Record the time immediately after running a task.
        performance.mark('myTask:end');
        // Measure the delta between the start and end of the task
        performance.measure('myTask', 'myTask:start', 'myTask:end');
        console.log(performance)
        const entries = performance.getEntriesByType("mark");
        for (const entry of entries) {
        console.table(entry.toJSON());
        }
    }
    else
    {
        connectButton.innerHTML = "Please Install MEtamask"
    }
}

async function isiform()
{
    const lender = document.getElementById("lender").value
    const borrower = document.getElementById("borrower").value
    const loanAmount = parseInt(document.getElementById("loanAmount").value)
    const payoffAmount = parseInt(document.getElementById("payoffAmount").value)
    const loanDuration = parseInt(document.getElementById("loanDuration").value)

    if (typeof window.ethereum !== "undefined")
    {
        try
        {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const Contract = new ethers.Contract(contractAddress, abi, signer)

            const tx = await Contract.IsiForm(lender, borrower, loanAmount, payoffAmount, loanDuration);
            await tx.wait();
            console.log(lender, borrower, loanAmount, payoffAmount, loanDuration);
            loan.save().then(() => console.log('Loan recorded'));
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
        resolve
        ()
    })
}