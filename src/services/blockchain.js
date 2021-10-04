import Web3 from "web3";
var web3;

export const initiateMetamask = async () => {
  // check if browser have the metamask installed
  if (typeof window.ethereum !== "undefined") {
    // metamask detected
    web3 = new Web3(window.ethereum);

    // request for account access
    if (requestForAccountAccess()) {
    } else {
      alert("Access denied");
    }
  } else {
    alert("Please install metamask first.");
  }
};

export const requestForAccountAccess = async () => {
  try {
    await window.ethereum.enable();
    return true;
  } catch (e) {
    return false;
  }
};

export const getCurrentBalance = async (account) => {
  web3 = new Web3(window.ethereum);
  return await web3.eth.getBalance(account);
};

export const getWalletAccounts = async () => {
  web3 = new Web3(window.ethereum);
  return await web3.eth.getAccounts();
};

export const makeTransaction = async (sendingBalance, fromAc, toAc, token) => {
  web3 = new Web3(window.ethereum);
  // check if you have valid balance
  let currentBalance = await web3.eth.getBalance(fromAc);

  if (currentBalance >= sendingBalance) {
    // valid to send the amount

    // making a transaction
    web3.eth.sendTransaction(
      {
        to: toAc,
        from: fromAc,
        value: web3.utils.toWei(sendingBalance.toString(), token.toStrin()),
      },
      async (error, receipt) => {
        if (error) {
          alert(JSON.stringify(error));
        } else {
          const newBalance = await web3.eth.getBalance(fromAc);
          return {
            message: "Transaction successful",
            newBalance: newBalance,
            receipt: receipt,
          };
        }
      }
    );
  } else {
    alert("You don't have enough balance to send");
  }
};
