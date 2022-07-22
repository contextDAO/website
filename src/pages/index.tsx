import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import HomeSection from '@/components/HomeSection';
import { Box, Container } from '@chakra-ui/react';

function Home() {
  return (
    <Box>
      <div className={styles.container}>
        <Head>
          <title>Context DAO - Schemas Dapp</title>
          <meta
            name="Context DAO - Schema manager"
            content="Dapp to manage schemas in Context DAO"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <Box marginTop={-725}>
        <HomeSection />
      </Box>
    </Box>
  );
}

Home.layout = `LayoutWeb`;
export default Home;
