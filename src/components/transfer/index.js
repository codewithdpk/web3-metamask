import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useHistory } from "react-router";

const Transfer = () => {
  const history = useHistory();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      background="#5EBEFF"
      border=" 1px solid #5EBEFF"
      boxSizing="border-box"
      boxShadow="0px 0px 40px rgba(0, 0, 0, 0.1)"
      borderRadius="12px"
      width="100%"
      textAlign="center"
      cursor="pointer"
      height="97px"
      onClick={() => history.push("/transfer")}
    >
      <Text
        fontSize="xx-large"
        fontFamily="Inter"
        fontWeight="bold"
        color="white"
      >
        Transfer
      </Text>
    </Box>
  );
};

export default Transfer;
