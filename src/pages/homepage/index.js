import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/header";
import ShowBalance from "../../components/ShowBalance";
import Transfer from "../../components/transfer";

const Homepage = () => {
  return (
    <Box>
      <Flex mt="20">
        <Box w="45%" mr="2.5%">
          <ShowBalance />
        </Box>

        <Box w="45%" ml="2.5%">
          <Transfer />
        </Box>
      </Flex>
    </Box>
  );
};

export default Homepage;
