import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { DappContext, User, getUser, getContributors } from '../context/dapp';
import { Unite, Schema } from '@unitedao/unite';
import { JWKInterface, SchemaState } from '@unitedao/unite';

import '@/styles/global.css';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import theme from './theme';

const standards: any = {
  Human: `jUeiklSqx8Mdp0mnDoswgMbeIbWS5DPKwyQUXpLPDLE`,
  Organization: `2veOsivaFqSvnEzrfI02UTC5ehOVQFRH7y4vhL_uhNI`,
  NFT: `W4rQYV64iQjZzrKoAWz5Q0F60ieojWJq-C05vzk6QAo`,
  Collection: `FVXP4EEDhsWQbwvHKeOUwpx0Ew0Aih7DPlxD21b7ZpE`,
};

function isWallet(wallet: JWKInterface | null): wallet is JWKInterface {
  return wallet !== null;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [unite, setUnite] = useState({} as Unite);
  const [user, setUser] = useState({} as User);
  const [contributors, setContributors] = useState([] as User[]);
  const [definition, setDefinition] = useState(``);
  const [standardName, setSetandardName] = useState(``);
  const [standard, setSetandard] = useState<Schema>({} as Schema);
  const [standardState, setSetandardState] = useState<SchemaState>(
    {} as SchemaState,
  );

  const initSchema = async (standardName: string, u: Unite = unite) => {
    const contractAddr = standards[standardName];
    let standard;
    if (u) {
      standard = await u.getSchema(contractAddr);
    } else {
      standard = await unite.getSchema(contractAddr);
    }
    const standardState: SchemaState = await standard.readState();
    setSetandard(standard);
    setSetandardName(standardName);
    setSetandardState(standardState);
    const definition = await u.getDefinition(standardState);
    setDefinition(definition);
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
    await initSchema(`Human`, u);
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
          definition,
          saveWallet,
          initSchema,
        }}
      >
        <Layout>
          <Component {...pageProps} />;
        </Layout>
      </DappContext.Provider>
    </ChakraProvider>
  );
}
