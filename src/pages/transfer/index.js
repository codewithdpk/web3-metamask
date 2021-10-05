import React, { useEffect, useState } from "react";
import { Box, Input, Select, Stack, Button } from "@chakra-ui/react";
import { getWalletAccounts, makeTransaction } from "../../services/blockchain";
const TransferPage = () => {
  const optionsCurrency = [
    { value: "ETH", label: "ether" },
    { value: "DAI", label: "DAI" },
  ];
  const [sendingBalance, setSendingBalance] = useState(0.0);
  const [toWallet, setToWallet] = useState("");
  const [token, setToken] = useState("");
  const [fromWallet, setFromWallet] = useState("");

  useEffect(async () => {
    let accounts = await getWalletAccounts();
    setFromWallet(accounts[0]);
  }, []);
  const hitTransaction = () => {
    makeTransaction(sendingBalance, fromWallet, toWallet, token);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      pt="24"
    >
      <Stack w="65%">
        <Input
          placeholder="Amount"
          type="number"
          onChange={(e) => setSendingBalance(e.target.value)}
        />
        <Input
          placeholder="Wallet Address"
          onChange={(e) => setToWallet(e.target.value)}
        />
        <Select
          bg="rgba(94, 190, 255, 0.1)"
          borderColor="#5EBEFF"
          color="#b1aec3"
          placeholder="Select Token"
          onChange={(e) => setToken(e.target.value)}
        >
          {optionsCurrency.map(({ value, label }) => {
            return <option value={value}>{label}</option>;
          })}
        </Select>
        <Button colorScheme="blue" onClick={(e) => hitTransaction()}>
          {" "}
          Transfer
        </Button>
      </Stack>
    </Box>
  );
};

export default TransferPage;
