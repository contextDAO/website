import { useDappContext } from '../context/dapp';

const Schema = () => {
  const { jsonSchema } = useDappContext();
  return (
    <div>
      <pre>{JSON.stringify(jsonSchema, null, 2)}</pre>
    </div>
  );
};

export default Schema;
