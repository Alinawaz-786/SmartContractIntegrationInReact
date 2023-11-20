// src/Stack.tsx

import React , { useState } from 'react';
import { ethers } from "ethers";
import contractAbi from "../utils/stackContract.json";
import '../css/stack.css';

const Token = () => {
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const contractAddress = '0x3C2075e8F46264736585dA62445274e08968128F';
  // Connect to Ethereum provider
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // Connect to the ERC-20 contract
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);
  
  const handleStackTransfer = async () => {
    try {
      // Ensure the user is connected to their wallet
      await window.ethereum.enable();
      // Perform the token transfer
      const transaction = await contract.stakeTokens(String(amount*1e18));
      // Wait for the transaction to be mined
      await transaction.wait();
      // Update the transaction hash state
      setTransactionHash(transaction.hash);

      // Clear input fields
      setAmount('');
    } catch (error) {
      console.error('Error transferring tokens:', error.message);
    }
  };

  return (
    <div className="product-form">
      <h2>Stack Token</h2>
        <div className="form-control">
          <label htmlFor="name">Stack</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Enther Stack Amount Token' />
        </div>
        <button type="submit" onClick={handleStackTransfer} >Stack</button>
        <p>{transactionHash}</p>
    </div>
  );
};

export default Token;
