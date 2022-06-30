import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import { Box, VStack, Stack } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';
import Schema from './Schema';
import Contributors from './Contributors';
import Proposals from './Proposals';
import About from './About';
import Releases from './Releases';

const Contractbar = () => {
  const { schemaState } = useDappContext();
  return (
    <Box>
      <Tabs w="100%">
        <VStack align="stretch" bg="#F6F8FA">
          <Box p={6}>
            <Text textAlign={useBreakpointValue({ base: `left` })}>
              <strong>{schemaState.schemaId}</strong>
            </Text>
          </Box>
          <Box h="40px">
            <TabList pl={12}>
              <Tab>Schema</Tab>
              <Tab>Proposals</Tab>
              <Tab>Contributors</Tab>
            </TabList>
          </Box>
        </VStack>
        <Box my={10} mx="auto" maxW="1200px" w={`100%`}>
          <Stack spacing={8} direction="row">
            <Box w="70%" border="1px" borderColor="gray.200">
              <TabPanels m={0}>
                <TabPanel>
                  <Schema />
                </TabPanel>
                <TabPanel p={0}>
                  <Proposals />
                </TabPanel>
                <TabPanel p={0}>
                  <Contributors />
                </TabPanel>
              </TabPanels>
            </Box>
            <Box w="30%">
              <About />
            </Box>
          </Stack>
        </Box>
      </Tabs>
    </Box>
  );
};

export default Contractbar;
