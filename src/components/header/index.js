import React, { useState, useEffect } from "react";
import logo from "../../assets/svgs/switch-1.svg";
import { Flex, Box, Image, Text, Stack, Avatar } from "@chakra-ui/react";
import { getWalletAccounts } from "../../services/blockchain";
const Header = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    async function perform() {
      const acList = await getWalletAccounts();
      setAccounts(acList);
    }
    perform();
  }, []);
  return (
    <Flex pos="relative">
      <Box display="flex" flexDir="row" alignItems="center">
        <Image src={logo} h="20px" w="20px" />
        <Text ml="3" fontSize="24px" fontWeight="extrabold">
          Dq Transfer
        </Text>
      </Box>

      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="flex-end"
        pos="absolute"
        right="0"
      >
        <Flex direction="column" textAlign="right" mr="3">
          <Text fontSize="16px">Account 1</Text>
          <Text fontSize="10px" color="gray">
            {accounts[0]}
          </Text>
        </Flex>
        <Avatar
          size="md"
          name="Dan Abrahmov"
          src="https://bit.ly/dan-abramov"
        />
      </Box>
    </Flex>
  );
};

export default Header;
