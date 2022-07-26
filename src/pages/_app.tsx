import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { Context, User, getUser, getContributors } from '../context/dapp';
import {
  SchemaState,
  initContext,
  Wallet,
  DappContext,
  getSchemaState,
  connectWallet,
} from '@contextdao/context';

import '@/styles/global.css';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import theme from './theme';

import LayoutWeb from '../components/LayoutWeb';
import LayoutDapp from '../components/LayoutDapp';
import styles from '@/styles/Home.module.css';
import Head from 'next/head';

const layouts = {
  LayoutWeb: LayoutWeb,
  LayoutDapp: LayoutDapp,
};

function isWallet(wallet: Wallet | null): wallet is Wallet {
  return wallet !== null && wallet.json !== null;
}

let firstTime = true;

export default function MyApp({ Component, pageProps }: AppProps) {
  const [dapp, setDapp] = useState({} as DappContext);
  const [user, setUser] = useState({} as User);
  const [contributors, setContributors] = useState([] as User[]);
  const [schemaState, setSetandardState] = useState<SchemaState>(
    {} as SchemaState,
  );

  const initSchema = async (schemaId: string, d: DappContext = dapp) => {
    // Init Schema State
    console.log(d);
    const schemaState = await getSchemaState(d, schemaId);
    console.log(schemaState);
    setSetandardState(schemaState);

    const contributors = await getContributors(schemaState);
    setContributors(contributors);
    /*
    if (user.wallet) {
      standard.connect(user.wallet);
      const reloadUser = await getUser(user.wallet, unite, schemaState);
      setUser(reloadUser);
    }
     */
  };

  const initContract = async () => {
    console.log(`initContract`);
    const dapp = await initContext({
      network: `testnet`,
      address: `lKw1ihNCLy-lTh3-RwXelV7-sWGGpRPKpF2mjpBCqNo`,
    });
    setDapp(dapp);
    await initSchema(`Human`, dapp);
  };

  useEffect(() => {
    console.log(`useEffect ${firstTime}`);
    if (firstTime) {
      initContract();
    }
    return () => {
      firstTime = false;
      console.log(`Cleanup..`);
    };
  }, []);

  const saveWallet = async (wallet: Wallet | null) => {
    if (isWallet(wallet)) {
      await connectWallet(dapp, wallet.json);
      setDapp(dapp);
      const user = await getUser(wallet, schemaState);
      setUser(user);
    } else {
      setUser({} as User);
    }
  };

  const Layout =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    layouts[Component.layout] || ((children: any) => <>{children}</>);
  return (
    <ChakraProvider theme={theme}>
      <Context.Provider
        value={{
          dapp,
          user,
          contributors,
          schemaState,
          initSchema,
          saveWallet,
        }}
      >
        <Head>
          <title>Context DAO - Schemas Dapp</title>
          <meta
            name="Context DAO - Schema manager"
            content="Dapp to manage schemas in Context DAO"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </Context.Provider>
    </ChakraProvider>
  );
}
