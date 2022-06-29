import { createContext, useContext } from 'react';
import {
  initContext,
  DappContext,
  Wallet,
  SchemaState,
} from '@contextdao/context';

export type User = {
  address: string;
  role: string;
  img: string;
};

export type DappContent = {
  dapp: DappContext;
  user: User;
  contributors: Array<User>;
  schemaId: string;
  definition: string;
  saveWallet: (wallet: Wallet) => void;
  initSchema: (contractAddr: string, u?: DappContext) => void;
};

export const Context = createContext<DappContent>({
  dapp: {} as DappContext,
  user: {} as User,
  contributors: [] as User[],
  schemaId: ``,
  definition: ``,
  saveWallet: () => {},
  initSchema: () => {},
});

export const getUser = async (
  wallet: Wallet,
  standardState: SchemaState,
): Promise<User> => {
  const contributor = standardState.contributors.find(
    (s: any) => s.address === wallet.address,
  );
  const role: string = contributor ? contributor.role : `none`;
  const user: User = {
    address: wallet.address,
    role,
    img: ``,
  };
  return user;
};

export const getContributors = async (
  schemaState: SchemaState,
): Promise<Array<User>> => {
  const contributors: Array<User> = [];
  schemaState.contributors.forEach((c: any) => {
    const contributor: User = {
      address: c.address,
      role: c.role,
      img: ``,
    };
    contributors.push(contributor);
  });
  return contributors;
};

export const useDappContext = () => useContext(Context);
