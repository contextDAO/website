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
  color: string;
};

export type DappContent = {
  unite: Unite;
  user: User;
  contributors: Array<User>;
  standard: Standard;
  standardState: UniteSchemaState;
  jsonSchema: object;
  saveWallet: (wallet: JWKInterface) => void;
};

export const DappContext = createContext<DappContent>({
  unite: {} as Unite,
  user: {} as User,
  contributors: [] as User[],
  standard: {} as Standard,
  standardState: {} as UniteSchemaState,
  jsonSchema: {},
  saveWallet: () => {},
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
    color: ``,
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
      color: ``,
      img: ``,
    };
    contributors.push(contributor);
  });
  return contributors;
};

export const useDappContext = () => useContext(DappContext);
