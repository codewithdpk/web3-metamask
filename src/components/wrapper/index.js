import React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";

const Wrapper = ({ children }) => {
  return (
    <ChakraProvider>
      <Container maxW="container.sm" pt="60px">
        {children}
      </Container>
    </ChakraProvider>
  );
};

export default Wrapper;
