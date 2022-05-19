import { Flex, Box, useColorModeValue } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box>
      <Flex
        bg={useColorModeValue(`white`, `gray.800`)}
        color={useColorModeValue(`gray.600`, `white`)}
        minH={`60px`}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={`solid`}
        borderColor={useColorModeValue(`gray.200`, `gray.900`)}
        align={`center`}
      >
        Logo
      </Flex>
    </Box>
  );
};

export default Navbar;
