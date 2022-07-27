import { ReactNode } from 'react';
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';

import Image1 from '/public/media/images/image1.png';

const StatsText = ({ children }: { children: ReactNode }) => (
  <Text as={`span`} fontWeight={700} color={`white`}>
    {children}
  </Text>
);

export default function Problem() {
  return (
    <Box bg={`primary`} position={`relative`} className="context__dao">
      <Container
        maxW={`7xl`}
        zIndex={10}
        position={`relative`}
        className="space__text"
      >
        <Stack direction={{ base: `column`, lg: `row` }}>
          <Stack
            flex={1}
            color={`secondary`}
            justify={{ lg: `center` }}
            py={{ base: 40, md: 40, xl: 60 }}
          >
            <Box mb={{ base: 8, md: 20 }} marginTop={`-100`}>
              <Heading
                color={`white`}
                mb={5}
                fontSize={{ base: `3xl`, md: `5xl` }}
              >
                Context DAO
              </Heading>
              <Text fontSize={`xl`} color={`gray.400`}>
                Is a set of Smart Contracts on Arweave to register and store
                standard-based information on Web3.
              </Text>
              <Text fontSize={`xl`} color={`gray.400`} marginTop={4}>
                Context DAO is a coordination framework to elaborate and evolve
                <StatsText>{` standards as Public goods`}</StatsText>.
                Cooperation is not possible without a common language we all
                agree on. And building this common framework should be a
                coordination task. A DAO is a perfect instrument for that.
              </Text>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {stats.map((stat) => (
                <Box key={stat.title}>
                  <Text
                    fontFamily={`heading`}
                    fontSize={`3xl`}
                    color={`white`}
                    mb={3}
                  >
                    {stat.title}
                  </Text>
                  <Text fontSize={`xl`} color={`gray.400`}>
                    {stat.content}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

const stats = [
  {
    title: `AS CODERS`,
    content: (
      <>
        Want the data in our dApps to be <StatsText>interoperable</StatsText>.
      </>
    ),
  },
  {
    title: `TIME SAVER`,
    content: (
      <>
        Find already made and well
        <StatsText> structured Schemas (Standards).</StatsText>
      </>
    ),
  },
  {
    title: `COOPERATION`,
    content: (
      <>
        A Registry of Data linked to
        <StatsText> public, collaborative repositories </StatsText>
        of schemas where builders can find the standard they need and evolve it.
      </>
    ),
  },
  {
    title: `PARTCIPATION`,
    content: (
      <>
        Possibility to add fields, taxonomy, improve existent Schemas, and
        <StatsText> much more!</StatsText>
      </>
    ),
  },
];
