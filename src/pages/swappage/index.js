import React, { useState } from "react";
import { Box, Stack, Input, Select, Button } from "@chakra-ui/react";
import {
  connectMetamaskToEther,
  getWalletAccounts,
  swapToken,
} from "../../services/blockchain";

const SwapPage = () => {
  const [swapAmount, setSwapAmount] = useState(0.0);

  const hitTransaction = async () => {
    let accounts = await getWalletAccounts();
    console.log(accounts);
    await swapToken(accounts[0], swapAmount);
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

        <Button colorScheme="blue" onClick={(e) => hitTransaction()}>
          Swap
        </Button>
      </Stack>
    </Box>
  );
};

export default SwapPage;
