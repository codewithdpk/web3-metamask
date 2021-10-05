import Web3 from "web3";
import abi from "../configs/abi.json";

var web3 = new Web3(window.ethereum);

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
  return web3.utils.fromWei(await web3.eth.getBalance(account), "ether");
};

export const getWalletAccounts = async () => {
  return await web3.eth.getAccounts();
};

export const getBalanceOfToken = async (address) => {
  var contract = new web3.eth.Contract(
    abi,
    "0xad6d458402f60fd3bd25163575031acdce07538d"
  );
  let balance = await contract.methods.balanceOf(address).call();
  return web3.utils.fromWei(balance.toString(), "ether");
};

export const makeTransaction = async (sendingBalance, fromAc, toAc, token) => {
  console.log(token);
  if (token === "ETH") {
    // check if you have valid balance
    let currentBalance = await web3.eth.getBalance(fromAc);

    if (currentBalance >= sendingBalance) {
      // valid to send the amount

      // making a transaction
      web3.eth.sendTransaction(
        {
          to: toAc,
          from: fromAc,
          value: web3.utils.toWei(sendingBalance.toString(), "ether"),
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
  } else {
    let tokenBalance = await getBalanceOfToken(fromAc);

    var contract = new web3.eth.Contract(
      abi,
      "0xad6d458402f60fd3bd25163575031acdce07538d"
    );
    if (tokenBalance >= sendingBalance) {
      // tx to the blockchain
      let result = await contract.methods
        .transfer(
          toAc,
          await web3.utils.toBN(
            await web3.utils.toWei(sendingBalance.toString(), "ether")
          )
        )
        .send({ from: fromAc });

      return result;
      // var interval = setInterval(async function () {
      //   return await web3.eth.getTransactionReceipt(
      //     result.transactionHash,
      //     function (err, receipt) {
      //       if (err) return console.error("error getting receipt", err);

      //       return receipt;
      //     }
      //   );
      // }, 1000);
    } else {
      alert("Token balance is not enough");
    }
  }
};
