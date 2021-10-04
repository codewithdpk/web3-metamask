import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/header";
import ShowBalance from "../../components/ShowBalance";

const Homepage = () => {
  return (
    <Box>
      <Header />
      <Flex mt="20">
        <ShowBalance />
      </Flex>
    </Box>
  );
};

export default Homepage;
