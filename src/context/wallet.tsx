import { createContext, useContext } from 'react';
import {
  Unite,
  JWKInterface,
  Standard,
  UniteSchemaState,
} from '@unitedao/unite';

export type WalletContent = {
  unite: Unite;
  wallet: JWKInterface;
  address: string;
  standard: Standard;
  standardState: UniteSchemaState;
  jsonSchema: object;
  saveWallet: (wallet: JWKInterface) => void;
};

export const WalletContext = createContext<WalletContent>({
  unite: {} as Unite,
  wallet: {} as JWKInterface,
  address: ``,
  standard: {} as Standard,
  standardState: {} as UniteSchemaState,
  jsonSchema: {},
  saveWallet: () => {
    console.log(`KO`);
  },
});

export const useWalletContext = () => useContext(WalletContext);
