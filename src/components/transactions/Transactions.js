import React from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Badge, Tooltip } from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";
import { fromWei } from "../../services/blockchain";
import { getDateStringServ } from "../../utils";

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
      accessor: "gasPrice",
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
        {data
          .slice(0)
          .reverse()
          .map((row) => (
            <tr>
              <td
                style={{
                  padding: "12px 20px 12px 0",
                  color: "#3498db",
                  cursor: "pointer",
                }}
              >
                <Tooltip label="View on Etherscan" fontSize="sm">
                  <Text
                    fontSize="medium"
                    onClick={() => viewTheTxn(`tx/${row.hash}`)}
                  >
                    {row.shortHash}
                  </Text>
                </Tooltip>
              </td>
              <td style={{ padding: "12px 20px 12px 0" }}>
                <Text fontSize="medium">{row.blockNumber}</Text>
              </td>
              <td style={{ padding: "12px 20px 12px 0" }}>
                <Badge ml="1" fontSize="0.8em" fontWeight={"normal"}>
                  {row.gasPrice} ETH
                </Badge>
              </td>
              <td
                style={{
                  padding: "12px 20px 12px 0",
                  color: "#3498db",
                  cursor: "pointer",
                }}
              >
                <Tooltip label="View on Etherscan" fontSize="sm">
                  <Text
                    fontSize="medium"
                    onClick={() => viewTheTxn(`address/${row.from}`)}
                  >
                    {row.fromShort}
                  </Text>
                </Tooltip>
              </td>
              <td
                style={{
                  padding: "12px 20px 12px 0",
                  color: "#3498db",
                  cursor: "pointer",
                }}
              >
                <Tooltip label="View on Etherscan" fontSize="sm">
                  <Text
                    fontSize="medium"
                    onClick={() => viewTheTxn(`address/${row.to}`)}
                  >
                    {row.toShort}
                  </Text>
                </Tooltip>
              </td>
              <td style={{ padding: "12px 20px 12px 0" }}>
                <Badge>{fromWei(row.value)} ETH</Badge>
              </td>
              <td style={{ padding: "12px 20px 12px 0" }}>
                <Text fontSize="0.9em">{getDateStringServ(row.timeStamp)}</Text>
              </td>
            </tr>
          ))}
      </table>
    </Box>
  );
};
