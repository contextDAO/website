import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { DappContext, User, getUser, getContributors } from '../context/dapp';
import { Unite, Standard } from '@unitedao/unite';
import { JWKInterface, UniteSchemaState } from '@unitedao/unite';

import '@/styles/global.css';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import theme from './theme';

const standards: any = {
  '@human': `9CTA0Dax0WMcvG7AldDdMX3NQLRQGk1TiaXByYLwhGg`,
  '@organization': `8Um1twqJOyR0CNpZQvczneQ1Ae7EKMsydbY2Qj0WIqU`,
  '@collection': `-7qb5UrTH11R5WoyPmYBSIcpPbEvGJSJ5F6jp-O3qfA`,
};

function isWallet(wallet: JWKInterface | null): wallet is JWKInterface {
  return wallet !== null;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [unite, setUnite] = useState({} as Unite);
  const [user, setUser] = useState({} as User);
  const [contributors, setContributors] = useState([] as User[]);
  const [jsonSchema, setSchema] = useState({} as object);
  const [standardName, setSetandardName] = useState(``);
  const [standard, setSetandard] = useState<Standard>({} as Standard);
  const [standardState, setSetandardState] = useState<UniteSchemaState>(
    {} as UniteSchemaState,
  );

  const initStandard = async (standardName: string, u?: Unite) => {
    const contractAddr = standards[standardName];
    let standard;
    if (u) {
      standard = await u.getStandard(contractAddr);
    } else {
      standard = await unite.getStandard(contractAddr);
    }
    const standardState: UniteSchemaState = await standard.readState();
    setSetandard(standard);
    setSetandardName(standardName);
    setSetandardState(standardState);
    const json = await standard.getSchema();
    setSchema(json);
    const contributors = await getContributors(standardState);
    setContributors(contributors);

    if (user.wallet) {
      standard.connect(user.wallet);
      const reloadUser = await getUser(user.wallet, unite, standardState);
      setUser(reloadUser);
    }
  };

  const initContract = async () => {
    const u = await Unite.init(`localhost`);
    setUnite(u);
    await initStandard(`@human`, u);
  };

  useEffect(() => {
    initContract();
  }, []);

  const saveWallet = async (wallet: JWKInterface | null) => {
    if (isWallet(wallet)) {
      standard.connect(wallet);
      const user = await getUser(wallet, unite, standardState);
      setUser(user);
    } else {
      setUser({} as User);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <DappContext.Provider
        value={{
          unite,
          user,
          contributors,
          standard,
          standardName,
          standardState,
          jsonSchema,
          saveWallet,
          initStandard,
        }}
      >
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </DappContext.Provider>
    </ChakraProvider>
  );
}
