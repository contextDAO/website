import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
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

function isWallet(wallet: Wallet | null): wallet is Wallet {
  return wallet !== null && wallet.json !== null;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [firstTime, setFirstTime] = useState(true);
  const [dapp, setDapp] = useState({} as DappContext);
  const [user, setUser] = useState({} as User);
  const [contributors, setContributors] = useState([] as User[]);
  const [schemaState, setSetandardState] = useState<SchemaState>(
    {} as SchemaState,
  );

  const initSchema = async (schemaId: string, d: DappContext = dapp) => {
    // Init Schema State
    const schemaState = await getSchemaState(d, schemaId);
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
    const dapp = await initContext({
      network: `localhost`,
      address: `tSh-nyJeul4wQP3OWy5wHuS2h-axkiL5Kwa9cdD9NAo`,
    });
    setDapp(dapp);
    initSchema(`Human`, dapp);
  };

  useEffect(() => {
    if (firstTime) {
      initContract();
      setFirstTime(false);
    }
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
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </Context.Provider>
    </ChakraProvider>
  );
}
