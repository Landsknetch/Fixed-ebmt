import {Contract, ethers} from "./ethers-5.6.esm.min.js"
import {abi, contractAddress} from "./constants.js"
import mongoose from './mongoose.js'


const connectButton = document.getElementById("connectButton")
const isiformButton = document.getElementById("isiformButton")
connectButton.onclick = connect
isiformButton.onclick = isiform

console.log(ethers)
console.log(abi)
console.log(contractAddress)

const Loan = mongoose.model('Loan', {
    lender_address: String,
    borrower_address: String,
    loan_amount: Number,
    payoff_amount: Number,
    loan_duration : Number
});

const loan = new Loan({
    lender_address: '0x093434dEc270A41f80Bd088b69a5712c16Ac7edc',
    borrower_address:'0x613e80fdea3C2797c0F922Fb7d5c2742F619Ba6d',
    loan_amount: 10,
    payoff_amount: 2,
    loan_duration : 5
});


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

            performance.mark('ajukan:start');
            //Form Send Start
            const tx = await Contract.IsiForm(lender, borrower, loanAmount, payoffAmount, loanDuration);
            await tx.wait();
            console.log(lender, borrower, loanAmount, payoffAmount, loanDuration);
            // Record the time immediately after running a task.
            performance.mark('ajukan:end');
            // Measure the delta between the start and end of the task
            performance.measure('ajukan', 'ajukan:start', 'ajukan:end');
            console.log(performance)
            const entries = performance.getEntriesByType("mark");
            for (const entry of entries) {
            console.table(entry.toJSON());
            }
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