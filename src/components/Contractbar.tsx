import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import { Box, VStack } from '@chakra-ui/react';
import { useWalletContext } from '../context/wallet';
import Schema from './Schema';
import Contributors from './Contributors';

const Contractbar = () => {
  const { standardState } = useWalletContext();
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
        <VStack align="stretch">
          <Box>
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
        </VStack>
      </Tabs>
    </Box>
  );
};

export default Contractbar;
