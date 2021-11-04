import { Box } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { TransactionTable } from "../../components/transactions";
import { getWalletAccounts } from "../../services/blockchain";
import { getAllLogs } from "../../services/etherscan";

export const TransactionsPage = () => {
  useEffect(async () => {
    const accounts = await getWalletAccounts();
    const logs = await getAllLogs(accounts[0]);
    console.log("Account logs:=>", logs);
  }, []);

  return (
    <Box>
      <TransactionTable />
    </Box>
  );
};
