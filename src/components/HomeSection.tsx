import { Box } from '@chakra-ui/react';
import Intro from './Intro';
import Info from './Info';
import Problem from '@/components/Problem';
import Scenario from '@/components/Scenario';
import Footer from '@/components/Footer';

const HomeSection = () => {
  return (
    <Box className="homeSection">
      <Intro />
      <Problem />
      <Info />
      <Info />
      {/*<Scenario />*/}
      {/*<Solution />*/}
      {/*<Tokenomics />*/}
      {/*<Roadmap />*/}
      <Footer />
    </Box>
  );
};

export default HomeSection;
