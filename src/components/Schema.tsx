import { Text } from '@chakra-ui/react';
import { useWalletContext } from '../context/wallet';

const Schema = () => {
  const { jsonSchema } = useWalletContext();
  return (
    <div>
      <pre>{JSON.stringify(jsonSchema, null, 2)}</pre>
    </div>
  );
};

export default Schema;
