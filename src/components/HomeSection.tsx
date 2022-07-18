import { useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Flex, Box, Stack } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import Link from 'next/link';
import Intro from './Intro';

const HomeSection = () => {
  return (
    <Box>
      <Intro />
      {/*<Info/>*/}
      {/*<Roadmap/>*/}
    </Box>
  );
};

export default HomeSection;
