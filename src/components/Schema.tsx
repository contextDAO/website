import { Field } from '@unitedao/unite';
import { useDappContext } from '../context/dapp';
import { Box } from '@chakra-ui/react';
import FieldDetails from './FieldDetails';

const Schema = () => {
  const { standardState, jsonSchema } = useDappContext();
  return (
    <div>
      {standardState.versionId > -1 &&
        standardState.versions[standardState.versionId].fields?.map(
          (field: Field, index: number) => (
            <FieldDetails field={field} key={index} />
          ),
        )}
      <Box mt={3}>
        <pre>{JSON.stringify(jsonSchema, null, 2)}</pre>
      </Box>
    </div>
  );
};

export default Schema;
