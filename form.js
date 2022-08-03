import {ethers} from "./ethers-5.6.esm.min.js"



const sending = document.getElementById("sending")
const inputfield = document.getElementById("message") 

const signMessage = async ({message}) => {
    try {
      console.log({ message });
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");
  
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      return {
        message,
        address
      };
    } catch (err) {}
  };

  sending.addEventListener('click',() => {
    signMessage({message : inputfield.value})
  })