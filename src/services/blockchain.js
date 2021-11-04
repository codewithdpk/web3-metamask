import Web3 from "web3";
import abi from "../configs/abi.json";
import exchange_abi from "../configs/exchange_abi.json";
import { ethers } from "ethers";
import TOKENS_DATA from "../tokens.json";

import {
  CONTRACT_ADDRESS,
  ROUTER_ADDRESS,
  ROUTER_CONTRACT,
  TOKEN_ADDRESS,
  WETH_ADDRESS,
} from "../configs/configs";

import {
  ChainId,
  Token,
  WETH,
  Fetcher,
  Trade,
  Route,
  TokenAmount,
  TradeType,
  Percent,
} from "@uniswap/sdk";

var web3 = new Web3(window.ethereum);

var provider = new ethers.providers.Web3Provider(window.ethereum, "any");

var signer = provider.getSigner();

export const initiateMetamask = async () => {
  // check if browser have the metamask installed
  if (typeof window.ethereum !== "undefined") {
    // metamask detected
    web3 = new Web3(window.ethereum);

    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
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
  var contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
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

    var contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
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

export const connectMetamaskToEther = async () => {};

export const swapToken = async (walletAddress, amount) => {
  let buyingAmount = await ethers.utils.parseEther(amount); // use etherjs

  console.log(walletAddress);

  const daiContractAddress = "0xad6d458402f60fd3bd25163575031acdce07538d";

  const DAI = new Token(ChainId.ROPSTEN, daiContractAddress, 18);

  const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId]);

  const route = new Route([pair], WETH[DAI.chainId]);

  const amountIn = buyingAmount.toString(); // 1 WETH

  const trade = new Trade(
    route,
    new TokenAmount(WETH[DAI.chainId], amountIn),
    TradeType.EXACT_INPUT
  );

  console.log(trade);

  const router = new ethers.Contract(ROUTER_CONTRACT, exchange_abi, signer);

  console.log("Router=>", router);

  const path = [WETH[DAI.chainId].address, DAI.address];

  const slippageTolerance = new Percent("50", "10000"); // 50 bips, or 0.50%

  const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw.toString(); // needs to be converted to e.g. hex

  const to = ""; // should be a checksummed recipient address
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
  const value = trade.inputAmount.raw.toString(); // // needs to be converted to e.g. hex
  let tx = await router.swapExactETHForTokens(
    amountOutMin,
    path,
    walletAddress,
    deadline,
    { value }
  );

  await tx.wait();
  console.log(tx);
};

export const getEstimatedValue = async (amount, token) => {
  // parsing the actual amount into wei units
  let buyingAmount = await ethers.utils.parseEther(amount); // use etherjs
  // getting token contract address from token data json
  const tokenAddress = TOKENS_DATA[token].address;

  console.log(tokenAddress);

  // creating token object of ether
  const EXG_TKN = new Token(
    ChainId.ROPSTEN,
    tokenAddress,
    TOKENS_DATA[token].decimals
  );

  const pair = await Fetcher.fetchPairData(EXG_TKN, WETH[EXG_TKN.chainId]);

  const route = new Route([pair], WETH[EXG_TKN.chainId]);

  const amountIn = buyingAmount.toString(); // 1 WETH

  const trade = new Trade(
    route,
    new TokenAmount(WETH[EXG_TKN.chainId], amountIn),
    TradeType.EXACT_INPUT
  );

  return await trade.outputAmount.toSignificant(TOKENS_DATA[token].decimals);
};
