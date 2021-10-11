import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/header";
import ShowBalance from "../../components/ShowBalance";
import SwapButton from "../../components/swap";
import Transfer from "../../components/transfer";

const Homepage = () => {
  return (
    <Box>
      <Flex mt="20">
        <Box w="50%" mr="2.5%">
          <Text fontSize="large" fontWeight="bold" mb="4">
            Available Balance
          </Text>
          <ShowBalance />
        </Box>

        <Box w="45%" ml="2.5%">
          <Text fontSize="large" fontWeight="bold" mb="4">
            Transfer
          </Text>
          <Transfer />
          <SwapButton />
        </Box>
      </Flex>
    </Box>
  );
};

export default Homepage;
