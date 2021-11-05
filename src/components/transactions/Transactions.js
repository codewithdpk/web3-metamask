import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { useTable, useSortBy } from "react-table";
import { fromWei } from "../../services/blockchain";

export const TransactionTable = ({ data }) => {
  const columns = [
    {
      Header: "Txn Hash",
      accessor: "hash",
    },
    {
      Header: "Block",
      accessor: "blockNumber",
    },
    {
      Header: "Gas",
      accessor: "gasUsed",
    },
    {
      Header: "From",
      accessor: "from",
    },
    {
      Header: "To",
      accessor: "to",
    },
    {
      Header: "Value",
      accessor: "value",
    },
    {
      Header: "Time",
      accessor: "timeStamp",
    },
  ];

  const viewTheTxn = (hashWithPrefix) => {
    console.log(hashWithPrefix);
    window.open(`https://ropsten.etherscan.io/${hashWithPrefix}`, "_blank");
  };

  return (
    <Box pt="30px">
      <table width="100%">
        <tr>
          {columns.map((column) => (
            <th style={{ textAlign: "start" }}>
              <Text
                textTransform="uppercase"
                fontSize="small"
                fontWeight="bold"
                color="gray.600"
              >
                {column.Header}
              </Text>
            </th>
          ))}
        </tr>
        {data.map((row) => (
          <tr>
            <td
              style={{ padding: "12px 0", color: "#3498db", cursor: "pointer" }}
            >
              <Text
                fontSize="medium"
                onClick={() => viewTheTxn(`tx/${row.hash}`)}
              >
                {row.shortHash}
              </Text>
            </td>
            <td style={{ padding: "12px 0" }}>
              <Text fontSize="medium">{row.blockNumber}</Text>
            </td>
            <td style={{ padding: "12px 0" }}>
              <Text fontSize="medium">{row.gasUsed}</Text>
            </td>
            <td
              style={{ padding: "12px 0", color: "#3498db", cursor: "pointer" }}
            >
              <Text
                fontSize="medium"
                onClick={() => viewTheTxn(`address/${row.from}`)}
              >
                {row.fromShort}
              </Text>
            </td>
            <td
              style={{ padding: "12px 0", color: "#3498db", cursor: "pointer" }}
            >
              <Text
                fontSize="medium"
                onClick={() => viewTheTxn(`address/${row.to}`)}
              >
                {row.toShort}
              </Text>
            </td>
            <td style={{ padding: "12px 0" }}>
              <Text fontSize="medium">{fromWei(row.value)} ETH</Text>
            </td>
            <td style={{ padding: "12px 0" }}>
              <Text fontSize="medium">
                {new Date(row.timeStamp * 1000).toUTCString()}
              </Text>
            </td>
          </tr>
        ))}
      </table>
    </Box>
  );
};
