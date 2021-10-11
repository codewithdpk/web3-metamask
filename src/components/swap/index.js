import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useHistory } from "react-router";

const SwapButton = () => {
  const history = useHistory();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      background="red"
      border=" 1px solid red"
      boxSizing="border-box"
      boxShadow="0px 0px 40px rgba(0, 0, 0, 0.1)"
      borderRadius="12px"
      width="100%"
      textAlign="center"
      cursor="pointer"
      height="40px"
      mt="4"
      onClick={() => history.push("/swap")}
    >
      <Text fontSize="small" fontFamily="Inter" color="white">
        Swap Token
      </Text>
    </Box>
  );
};

export default SwapButton;
