import { useState } from 'react';
import { Text, Button, Box, HStack, Spacer } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';

const Versions = () => {
  const { standardState, user } = useDappContext();
  console.log(standardState.versions);
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
      {standardState.versions?.length === 0 && <Text m={12}>No Versions</Text>}
      {standardState.versions?.map((version: any, index: number) => (
        <HStack
          key={index}
          spacing="24px"
          borderBottom="1px"
          borderColor="gray.200"
          p={3}
        >
          <Text fontSize="xs">#{index}</Text>
          <Text>
            <b>{version.version}</b>
          </Text>
          <Spacer />
          <Text fontSize="xs">
            Proposal #{version.proposalId}
            <br />
            {standardState.proposals[version.proposalId].name}
          </Text>
        </HStack>
      ))}
    </div>
  );
};

export default Versions;
