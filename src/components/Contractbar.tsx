import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import { Box, VStack, Stack } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';
import Schema from './Schema';
import Contributors from './Contributors';
import About from './About';

const Contractbar = () => {
  const { standardState } = useDappContext();
  return (
    <Box>
      <Tabs w="100%">
        <VStack align="stretch" bg="#F6F8FA">
          <Box p={6}>
            <Text textAlign={useBreakpointValue({ base: `left` })}>
              <strong>{standardState.title}</strong>
              <br />
              {standardState.description}
            </Text>
          </Box>
          <Box h="40px">
            <TabList pl={12}>
              <Tab>Schema</Tab>
              <Tab>Versions</Tab>
              <Tab>Proposals</Tab>
              <Tab>Contributors</Tab>
            </TabList>
          </Box>
        </VStack>
        <Box my={10} mx="auto" maxW="1200px" w={`100%`}>
          <Stack spacing={8} direction="row">
            <Box w="70%" border="1px" borderColor="gray.200">
              <TabPanels>
                <TabPanel>
                  <Schema />
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
                <TabPanel>
                  <Contributors />
                </TabPanel>
              </TabPanels>
            </Box>
            <Box w="30%">
              <About role="" />
            </Box>
          </Stack>
        </Box>
      </Tabs>
    </Box>
  );
};

export default Contractbar;
