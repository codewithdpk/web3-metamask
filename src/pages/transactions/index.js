import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { TransactionTable } from "../../components/transactions";
import { getWalletAccounts } from "../../services/blockchain";
import { getAllLogs } from "../../services/etherscan";

export const TransactionsPage = () => {
  const [accountLogs, setAccountLogs] = useState([]);
  useEffect(async () => {
    const accounts = await getWalletAccounts();
    const logs = await getAllLogs(accounts[0]);
    let rows = logs.result.map((row) => {
      return {
        ...row,
        hash: `${row.hash.slice(0, 8)}...`,
        from: `${row.from.slice(0, 8)}...`,
        to: `${row.to.slice(0, 8)}...`,
      };
    });

    console.log(rows);
    setAccountLogs(rows);
  }, []);

  return (
    <Box>
      <TransactionTable data={accountLogs} />
    </Box>
  );
};
