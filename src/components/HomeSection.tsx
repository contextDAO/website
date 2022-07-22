import { Box } from '@chakra-ui/react';
import Intro from './Intro';
import Info from './Info';

const HomeSection = () => {
  return (
    <Box>
      <Intro />
      <Info />
      <Info />
      <Intro />
      <Info />
      <Intro />
      {/*<Problem />*/}
      {/*<Scenario />*/}
      {/*<Solution />*/}
      {/*<Tokenomics />*/}
      {/*<Roadmap />*/}
    </Box>
  );
};

export default HomeSection;
