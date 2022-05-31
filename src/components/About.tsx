import { Box, Text, Heading, Divider } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';

const About = () => {
  const { standardState } = useDappContext();
  console.log(standardState);
  return (
    <Box>
      <Heading as="h2" size="md">
        {standardState.title}
      </Heading>
      <Text>{standardState.description}</Text>
      <Divider my="12px" />
      <Heading as="h2" size="md">
        Releases
      </Heading>
      <Text size="xs" color="gray.600">
        {standardState.versions.length} releases
      </Text>
      <Text mt="16px">
        current version :&nbsp;
        <b>
          {standardState.major}.{standardState.minor}.{standardState.patch}
        </b>
      </Text>
      <Divider my="12px" />
      <Heading as="h2" size="md">
        Proposals
      </Heading>
      <Text size="xs" color="gray.600">
        {standardState.proposals.length} proposals
      </Text>
    </Box>
  );
};

export default About;
