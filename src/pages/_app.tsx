import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { WalletContext } from '../context/wallet';
import { Unite, Standard } from '@unitedao/unite';
import { JWKInterface, UniteSchemaState } from '@unitedao/unite';

import '@/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [wallet, setWallet] = useState<JWKInterface>({} as JWKInterface);
  const [address, setAddress] = useState(``);
  const [unite, setUnite] = useState<Unite>({} as Unite);
  const [jsonSchema, setSchema] = useState({} as object);
  const [standard, setSetandard] = useState<Standard>({} as Standard);
  const [standardState, setSetandardState] = useState<UniteSchemaState>(
    {} as UniteSchemaState,
  );

  const initContract = async () => {
    const u = await Unite.init(`localhost`);
    setUnite(u);
    const standard = await u.getStandard(
      `PHjWqQ8vSgDbkf07mlToUtkW2FLWBM50pfzV2NzZsV0`,
    );
    const standardState: UniteSchemaState = await standard.readState();
    setSetandard(standard);
    setSetandardState(standardState);
    const json = await standard.getSchema();
    setSchema(json);
  };

  useEffect(() => {
    initContract();
  }, []);

  const saveWallet = async (wallet: JWKInterface) => {
    setWallet(wallet);
    standard.connect(wallet);
    const addr = await unite.getAddress(wallet);
    setAddress(addr);
  };

  return (
    <ChakraProvider>
      <WalletContext.Provider
        value={{
          unite,
          wallet,
          address,
          standard,
          standardState,
          jsonSchema,
          saveWallet,
        }}
      >
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </WalletContext.Provider>
    </ChakraProvider>
  );
}
