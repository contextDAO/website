import { Text, Box, HStack, Spacer } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';

const Versions = () => {
  const { standardState } = useDappContext();
  return (
    <div>
      <Box
        backgroundColor="#F6F8FA"
        p={4}
        mb={3}
        borderBottom="1px"
        borderColor="gray.200"
      >
        Releases
      </Box>
      {standardState.releases?.length === 0 && <Text m={12}>No releases</Text>}
      {standardState.releases?.map((release: any, index: number) => (
        <HStack
          key={index}
          spacing="24px"
          borderBottom="1px"
          borderColor="gray.200"
          p={3}
        >
          <Text fontSize="xs">#{index}</Text>
          <Spacer />
          <Text fontSize="xs">#{release.fields.length} fields</Text>
          <Text fontSize="xs">Date UPDATED (TODO)</Text>
        </HStack>
      ))}
    </div>
  );
};

export default Versions;
