import { useRef } from 'react';
import { Box, Text, Heading, Divider, Select } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';

const About = () => {
  const { standardState, initSchema } = useDappContext();
  const selectRef = useRef<HTMLSelectElement>(null);

  const updateSchema = () => {
    if (selectRef.current !== null) {
      initSchema(selectRef.current.value);
    }
  };

  return (
    <Box>
      <Select ref={selectRef} onChange={updateSchema}>
        <option>@human</option>
        <option>@organization</option>
        <option>@collection</option>
      </Select>
      <Divider my="12px" />
      <Heading as="h2" size="md">
        Releases
      </Heading>
      <Text size="xs" color="gray.600">
        {standardState.releases?.length} releases
      </Text>
      {standardState.releaseId > -1 && (
        <Text mt="16px">current release: {standardState.releaseId}</Text>
      )}
      <Divider my="12px" />
      <Heading as="h2" size="md">
        Proposals
      </Heading>
      <Text size="xs" color="gray.600">
        {standardState.proposals?.length} proposals
      </Text>
    </Box>
  );
};

export default About;
