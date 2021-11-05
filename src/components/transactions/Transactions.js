import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { useTable, useSortBy } from "react-table";

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

  return (
    <Box pt="60px">
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
              <Text fontSize="medium">{row.hash}</Text>
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
              <Text fontSize="medium">{row.from}</Text>
            </td>
            <td
              style={{ padding: "12px 0", color: "#3498db", cursor: "pointer" }}
            >
              <Text fontSize="medium">{row.to}</Text>
            </td>
            <td style={{ padding: "12px 0" }}>
              <Text fontSize="medium">{row.value}</Text>
            </td>
            <td style={{ padding: "12px 0" }}>
              <Text fontSize="medium">{row.timeStamp}</Text>
            </td>
          </tr>
        ))}
      </table>
    </Box>
  );
};
