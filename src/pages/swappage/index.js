import React, { useEffect, useState } from "react";
import { Box, Stack, Input, Select, Button, Text } from "@chakra-ui/react";
import {
  connectMetamaskToEther,
  getEstimatedValue,
  getWalletAccounts,
  swapToken,
} from "../../services/blockchain";
import { TOKENS } from "../../token_options";

const SwapPage = () => {
  const [swapAmount, setSwapAmount] = useState(0.0);
  const [loadingValue, setLoadingValue] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [outputAmount, setOutputAmount] = useState(0);

  useEffect(() => {});

  const hitTransaction = async () => {
    let accounts = await getWalletAccounts();
    await swapToken(accounts[0], swapAmount);
  };

  const handleTokenSelectionAndGetExchangeEstimate = async (e) => {
    let token = e.target.value;
    setSelectedToken(e.target.value);
    setLoadingValue(true);
    let data = await getEstimatedValue(swapAmount, token);
    setOutputAmount(data);
    setLoadingValue(false);
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
          placeholder="ETH Amount"
          type="number"
          value={swapAmount}
          onChange={(e) => setSwapAmount(e.target.value)}
        />

        <Select
          bg="rgba(94, 190, 255, 0.1)"
          borderColor="#5EBEFF"
          color="#b1aec3"
          placeholder="Select Token"
          onChange={(e) => handleTokenSelectionAndGetExchangeEstimate(e)}
        >
          {Object.keys(TOKENS).map((key) => {
            return (
              <option value={TOKENS[key].symbol}>
                {TOKENS[key].name} - {TOKENS[key].symbol}
              </option>
            );
          })}
        </Select>

        {swapAmount !== 0.0 && selectedToken !== null && (
          <Box>
            {loadingValue ? (
              <Text>Loading...</Text>
            ) : (
              <Text>
                {outputAmount} {selectedToken}
              </Text>
            )}
          </Box>
        )}

        <Button colorScheme="blue" onClick={(e) => hitTransaction()}>
          Swap
        </Button>
      </Stack>
    </Box>
  );
};

export default SwapPage;
