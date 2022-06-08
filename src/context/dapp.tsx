import { createContext, useContext } from 'react';
import {
  Unite,
  JWKInterface,
  Standard,
  UniteSchemaState,
} from '@unitedao/unite';

export type User = {
  wallet: JWKInterface;
  address: string;
  role: string;
  img: string;
};

export type DappContent = {
  unite: Unite;
  user: User;
  contributors: Array<User>;
  standard: Standard;
  standardName: string;
  standardState: UniteSchemaState;
  jsonSchema: object;
  saveWallet: (wallet: JWKInterface) => void;
  initStandard: (contractAddr: string, u?: Unite) => void;
};

export const DappContext = createContext<DappContent>({
  unite: {} as Unite,
  user: {} as User,
  contributors: [] as User[],
  standard: {} as Standard,
  standardName: ``,
  standardState: {} as UniteSchemaState,
  jsonSchema: {},
  saveWallet: () => {},
  initStandard: () => {},
});

export const getUser = async (
  wallet: JWKInterface,
  unite: Unite,
  standardState: UniteSchemaState,
): Promise<User> => {
  const address = await unite.getAddress(wallet);
  const contributor = standardState.contributors.find(
    (e) => e.address === address,
  );
  const role: string = contributor ? contributor.role : `none`;
  const user: User = {
    wallet,
    address,
    role,
    img: ``,
  };
  return user;
};

export const getContributors = async (
  standardState: UniteSchemaState,
): Promise<Array<User>> => {
  const contributors: Array<User> = [];
  standardState.contributors.forEach((c) => {
    const contributor: User = {
      wallet: {} as JWKInterface,
      address: c.address,
      role: c.role,
      img: ``,
    };
    contributors.push(contributor);
  });
  return contributors;
};

export const useDappContext = () => useContext(DappContext);
