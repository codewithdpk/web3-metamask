import React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";

const Wrapper = ({ children }) => {
  return (
    <ChakraProvider>
      <Container maxW="container.lg" pt="30px">
        {children}
      </Container>
    </ChakraProvider>
  );
};

export default Wrapper;
