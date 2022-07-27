import { Box } from '@chakra-ui/react';
import Intro from './Intro';
import Info from './Info';
import Problem from '@/components/Problem';
import Footer from '@/components/Footer';
import KnowMore from '@/components/KnowMore';

const HomeSection = () => {
  return (
    <Box className="homeSection">
      <Intro />
      <Problem />
      <Info />
      <KnowMore />
      <Footer />
    </Box>
  );
};

export default HomeSection;
