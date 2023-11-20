// src/Stack.tsx

import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import '../css/stack.css';

import contractAbi from "../utils/tokenContractAbi.json";

const Stack = () => {
  const [isDisabled, setisDisabled] = useState(true)
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, settokenSymbol] = useState("")
  const MetaMaskConnection = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    const network = await provider.getNetwork();
    if (provider) {
      if (network.chainId === 97) {
        try {

          await provider.send("eth_requestAccounts", []);
          let signer = provider.getSigner();
          let address = await signer.getAddress();
          setisDisabled(false);
          console.log(address);
          let contractInstance = new ethers.Contract(
            "0xC1b53A55116270a7b1492E8b51e7Be6Db8c05451",
            contractAbi,
            signer
          );
          if (contractInstance) {
            setTokenName(await contractInstance.name())
            settokenSymbol(await contractInstance.symbol())
          }
        } catch (error) {

          if (error.code === 4001) {
            console.log("Error while connecting");
          } else if (error.code === -32002) {
            console.log(error.message);
          } else {
            console.log(error.message);
          }
        }
      } else {
        console.log("Please Connect to Avalanche first");
      }
    }

  }

  useEffect(() => {
    MetaMaskConnection();
  }, [])

  return (

    <div className="product-form">
      <h1>Token Name</h1>
      {isDisabled === false ? (
        <p>{tokenName}</p>
      ) : (
        <p></p>
      )}
      <h1>Token Symbol</h1>
      {isDisabled === false ? (
        <p>{tokenSymbol}</p>
      ) : (
        <p></p>
      )}

    </div>

  );
};

export default Stack;
