import { Field } from '@contextdao/context';
import { useDappContext } from '../context/dapp';
import { Box } from '@chakra-ui/react';
import FieldDetails from './FieldDetails';

const Schema = () => {
  const { schemaState } = useDappContext();
  return (
    <div>
      {schemaState.releaseId > -1 &&
        schemaState.releases[schemaState.releaseId].fields?.map(
          (field: Field, index: number) => (
            <FieldDetails field={field} key={index} />
          ),
        )}
      <Box mt={3} backgroundColor="teal" color="white" p={3}>
        <div style={{ whiteSpace: `pre-wrap` }}>definition</div>
      </Box>
    </div>
  );
};

export default Schema;
