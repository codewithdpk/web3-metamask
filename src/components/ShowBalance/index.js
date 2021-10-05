import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import {
  getBalanceOfToken,
  getCurrentBalance,
  getWalletAccounts,
} from "../../services/blockchain";
const ShowBalance = () => {
  const [currentBalanceEth, setCurrentBalanceEth] = useState(0.0);
  const [currentBalanceDai, setCurrentBalanceDai] = useState(0.0);

  useEffect(async () => {
    let accounts = await getWalletAccounts();
    let balance = await getCurrentBalance(accounts[0]);
    let tokenBalance = await getBalanceOfToken(accounts[0]);
    setCurrentBalanceDai(tokenBalance);
    setCurrentBalanceEth(balance);
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
        ethereum
      </Box>

      <Text fontSize="large" fontWeight="extrabold" mt="2">
        {currentBalanceEth} ETH
      </Text>

      <Box
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="10px"
        textTransform="uppercase"
        mt="4"
      >
        dai
      </Box>

      <Text fontSize="large" fontWeight="extrabold" mt="2">
        {currentBalanceDai} DAI
      </Text>
    </Box>
  );
};

export default ShowBalance;
