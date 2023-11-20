// src/Stack.tsx

import React , { useState } from 'react';
import { ethers } from "ethers";
import contractAbi from "../utils/stackContract.json";
// Replace these values with your ERC-20 contract address and ABI
import '../css/stack.css';

const Token = () => {
  const [amount, setAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const contractAddress = '0x37836d2038422a9db545965c46cb1de1b8a2a614';

    // Connect to Ethereum provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    // Connect to the ERC-20 contract
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  
    const handleTransfer = async () => {
      try {
        // Ensure the user is connected to their wallet
        await window.ethereum.enable();
  
        // Perform the token transfer
        console.log("ethers.utils.parseUnits(amount, 'ether')");
        console.log(Number(ethers.utils.parseUnits(amount, 'ether')));
        const transaction = await contract.buyTokens(0.01, Number(ethers.utils.parseUnits(amount, 'ether')));
  
        // Wait for the transaction to be mined
        await transaction.wait();
  
        // Update the transaction hash state
        setTransactionHash(transaction.hash);
  
        // Clear input fields
        setToAddress('');
        setAmount('');
      } catch (error) {
        console.error('Error transferring tokens:', error.message);
      }
    };

  return (
    <div className="product-form">
      <h2>Add a New Product</h2>
        <div className="form-control">
          <label htmlFor="name">Stack</label>
          <input type="text" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />

        </div>

        <div className="form-control">
          <label htmlFor="name">Stack</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />


        </div>


        <button type="submit" onClick={handleTransfer} >Add Product</button>

    </div>

  );
};

export default Token;
