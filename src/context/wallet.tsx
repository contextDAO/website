import { createContext, useContext } from 'react';
import { Unite } from '@unitedao/unite';

export type WalletContent = {
  unite: Unite;
  wallet: string;
  setWallet: () => void;
};

export const WalletContext = createContext<WalletContent>({
  unite: {} as Unite,
  wallet: ``,
  setWallet: () => {},
});

export const useWalletContext = () => useContext(WalletContext);
