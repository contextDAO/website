import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { DappContext, User, getUser, getContributors } from '../context/dapp';
import { Unite, Standard } from '@unitedao/unite';
import { JWKInterface, UniteSchemaState } from '@unitedao/unite';

import '@/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [unite, setUnite] = useState({} as Unite);
  const [user, setUser] = useState({} as User);
  const [contributors, setContributors] = useState([] as User[]);
  const [jsonSchema, setSchema] = useState({} as object);
  const [standard, setSetandard] = useState<Standard>({} as Standard);
  const [standardState, setSetandardState] = useState<UniteSchemaState>(
    {} as UniteSchemaState,
  );

  const initContract = async () => {
    const u = await Unite.init(`localhost`);
    setUnite(u);
    const standard = await u.getStandard(
      `4-E1YdF7lCC_FEUSQ3Lo7IHiNjOw-TfWOfI1TpdT-j8`,
    );
    const standardState: UniteSchemaState = await standard.readState();
    setSetandard(standard);
    setSetandardState(standardState);
    const json = await standard.getSchema();
    setSchema(json);
    const contributors = await getContributors(standardState);
    setContributors(contributors);
  };

  useEffect(() => {
    initContract();
  }, []);

  const saveWallet = async (wallet: JWKInterface) => {
    standard.connect(wallet);
    const user = await getUser(wallet, unite, standardState);
    setUser(user);
  };

  return (
    <ChakraProvider>
      <DappContext.Provider
        value={{
          unite,
          user,
          contributors,
          standard,
          standardState,
          jsonSchema,
          saveWallet,
        }}
      >
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </DappContext.Provider>
    </ChakraProvider>
  );
}
