import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';

import '@/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </ChakraProvider>
  );
}
