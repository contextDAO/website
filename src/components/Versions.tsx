import { useState } from 'react';
import { Text, Button, Box, HStack, Spacer } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';

const Versions = () => {
  const { standardState, user } = useDappContext();

  return (
    <div>
      <Box
        backgroundColor="#F6F8FA"
        p={4}
        mb={3}
        borderBottom="1px"
        borderColor="gray.200"
      >
        Versions
      </Box>
      {standardState.versions?.map((version: any, index: number) => (
        <HStack
          key={index}
          spacing="24px"
          borderBottom="1px"
          borderColor="gray.200"
          p={3}
        >
          <Text fontSize="xs">{version.version}</Text>
          <Spacer />
          <Box w={50}>Version</Box>
        </HStack>
      ))}
    </div>
  );
};

export default Versions;
