import { Box, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { TransactionTable } from "../../components/transactions";
import {
  fromWei,
  getTokenValue,
  getWalletAccounts,
} from "../../services/blockchain";
import { getAllLogs, getAllTokenLogs } from "../../services/etherscan";

export const TransactionsPage = () => {
  const [accountLogs, setAccountLogs] = useState([]);
  useEffect(async () => {
    const accounts = await getWalletAccounts();
    const logs = await getAllLogs(accounts[0]);
    const tokenLogs = await getAllTokenLogs(accounts[0]);
    console.log(tokenLogs);
    console.log(
      await getTokenValue(
        tokenLogs.result[0].contractAddress,
        tokenLogs.result[0].tokenSymbol,
        tokenLogs.result[0].value
      )
    );
    let rows = logs.result.map((row) => {
      return {
        ...row,
        shortHash: `${row.hash.slice(0, 8)}...`,
        fromShort: `${row.from.slice(0, 8)}...`,
        toShort: `${row.to.slice(0, 8)}...`,
        gasPrice: fromWei(row.gasPrice),
      };
    });

    console.log(rows);
    setAccountLogs(rows);
  }, []);

  return (
    <Box>
      <Box mt="80px">
        <Text fontSize="xl" fontWeight="bold">
          My Transactions
        </Text>
      </Box>
      <TransactionTable data={accountLogs} />
    </Box>
  );
};
