import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  getBalanceOfToken,
  getCurrentBalance,
  getWalletAccounts,
} from "../../services/blockchain";
const ShowBalance = () => {
  const [currentBalance, setCurrentBalance] = useState(0.0);
  useEffect(async () => {
    let accounts = await getWalletAccounts();
    let balance = await getCurrentBalance(accounts[0]);
    let tokenBalance = await getBalanceOfToken(accounts[0]);
    console.log("balance:", tokenBalance);
    setCurrentBalance(balance);
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      background="rgba(94, 190, 255, 0.1)"
      border=" 1px solid #5EBEFF"
      boxSizing="border-box"
      boxShadow="0px 0px 40px rgba(0, 0, 0, 0.1)"
      borderRadius="12px"
      p="4"
      width="100%"
    >
      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="10px"
        textTransform="uppercase"
      >
        available balance
      </Box>

      <Text fontSize="xx-large" fontWeight="extrabold">
        {currentBalance} ETH
      </Text>
    </Box>
  );
};

export default ShowBalance;
