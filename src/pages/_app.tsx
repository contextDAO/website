import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { WalletContext } from '../context/wallet';
import { Unite } from '@unitedao/unite';

import '@/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [wallet, setWallet] = useState();
  const [unite, setUnite] = useState<Unite>({} as Unite);

  useEffect(() => {
    Unite.init(`localhost`).then((u: Unite) => {
      setUnite(u);
    });
  }, []);
  return (
    <ChakraProvider>
      <WalletContext.Provider value={{ unite, wallet, setWallet }}>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </WalletContext.Provider>
    </ChakraProvider>
  );
}
