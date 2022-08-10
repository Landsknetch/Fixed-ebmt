import {Contract, ethers} from "./ethers-5.6.esm.min.js"
import {abi, contractAddress} from "./constants.js"

const connectButton = document.getElementById("connectButton")
const daftarButton = document.getElementById("daftarButton")
connectButton.onclick = connect
daftarButton.onclick = daftar

console.log(ethers)
console.log(abi)
console.log(contractAddress)

async function connect()
{
    if (typeof window.ethereum !== "undefined")
    {
        //Connection Task Begin
        await window.ethereum.request({method: "eth_requestAccounts"})
        connectButton.innerHTML = "Connected with MEtamask"
    }
    else
    {
        connectButton.innerHTML = "Please Install MEtamask"
    }
}

async function daftar()
{
    const nama = document.getElementById("nama").value
    const kota = document.getElementById("kota").value
    const anggota = document.getElementById("anggota").value
    const gaji = parseInt(document.getElementById("gaji").value)

    if (typeof window.ethereum !== "undefined")
    {
        try
        {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const Contract = new ethers.Contract(contractAddress, abi, signer)

            const tx = await Contract.daftar(nama, kota, gaji, anggota);
            await tx.wait();
            console.log(nama, kota, gaji, anggota);
            daftar.save().then(() => console.log('Pendaftaran recorded'));
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

// performance.mark('ajukan:start');
//             //Form Send Start
//             // Record the time immediately after running a task.
//             performance.mark('ajukan:end');
//             // Measure the delta between the start and end of the task
//             performance.measure('ajukan', 'ajukan:start', 'ajukan:end');
//             console.log(performance)
//             const entries = performance.getEntriesByType("mark");
//             for (const entry of entries) {
//             console.table(entry.toJSON());
//             }

        // // Record the time immediately before running a task.
        // performance.mark('myTask:start');
        // // Record the time immediately after running a task.
        // performance.mark('myTask:end');
        // // Measure the delta between the start and end of the task
        // performance.measure('myTask', 'myTask:start', 'myTask:end');
        // console.log(performance)
        // const entries = performance.getEntriesByType("mark");
        // for (const entry of entries) {
        // console.table(entry.toJSON());
        // }