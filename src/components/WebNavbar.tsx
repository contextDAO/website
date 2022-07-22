import { useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex, Box, Stack } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import Link from 'next/link';

const DappNavbar = () => {
  return (
    <Box>
      <Flex
        bg={`primary`}
        color={`white`}
        minH={`60px`}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={`solid`}
        borderColor={useColorModeValue(`gray.200`, `gray.900`)}
        align={`center`}
      >
        <Flex flex={{ base: 1 }} justify={{ base: `center`, md: `start` }}>
          <Text textAlign={useBreakpointValue({ base: `center` })}>
            Data with <b>Context WEBSITE</b>
          </Text>
        </Flex>
        <Stack flex={{ base: 1, md: 0 }} justify={`flex-end`} direction={`row`}>
          <Link href="/dapp">
            <Button
              display={{ base: `none`, md: `inline-flex` }}
              fontSize={`sm`}
              fontWeight={600}
              color={`white`}
              bg="#42D5DD"
              _hover={{
                bg: `white`,
                color: `gray`,
              }}
            >
              Launch APP
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default DappNavbar;
