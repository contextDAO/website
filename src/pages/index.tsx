import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import HomeSection from '@/components/HomeSection';
import { Box, Container } from '@chakra-ui/react';

function Home() {
  return (
    <Box>
      <HomeSection />
    </Box>
  );
}

Home.layout = `LayoutWeb`;
export default Home;
