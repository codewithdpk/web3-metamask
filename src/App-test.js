import React, { useEffect, useState } from "react";
import Web3 from "web3";
var web3;

const AppTest = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0.0);

  const [toWallet, setToWallet] = useState(null);
  const [sendingBalance, setSendingBalance] = useState(0.0);

  useEffect(async () => {
    // check if browser have the metamask installed
    if (typeof window.ethereum !== "undefined") {
      // metamask detected
      web3 = new Web3(window.ethereum);

      // request for account access
      if (requestForAccountAccess()) {
        var accounts = await web3.eth.getAccounts();
        var balance = await web3.eth.getBalance(accounts[0]);
        setWalletBalance(balance);
        setWalletAddress(accounts[0]);
      } else {
        alert("Access denied");
      }
    } else {
      alert("Please install metamask first.");
    }
  }, []);

  const requestForAccountAccess = async () => {
    try {
      await window.ethereum.enable();
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "100px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>Wallet Address: {walletAddress}</span>
          <br />
          <span>Wallet Balance: {walletBalance} ETH</span>
          <br />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span fontSize="24px"> Make a transaction </span> <br />
          <input
            placeholder="Enter amount"
            type="number"
            value={sendingBalance}
            onChange={(e) => setSendingBalance(e.target.value)}
          />
          <br />
          <input
            placeholder="Enter wallet address"
            value={toWallet}
            onChange={(e) => setToWallet(e.target.value)}
          />
        </div>
        <div>
          <br />
          <button onClick={() => makeTransaction()}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default AppTest;
