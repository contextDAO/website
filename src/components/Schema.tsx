import { Field } from '@unitedao/unite';
import { useDappContext } from '../context/dapp';
import { Box } from '@chakra-ui/react';
import FieldDetails from './FieldDetails';

const Schema = () => {
  const { standardState, definition } = useDappContext();
  return (
    <div>
      {standardState.releaseId > -1 &&
        standardState.releases[standardState.releaseId].fields?.map(
          (field: Field, index: number) => (
            <FieldDetails field={field} key={index} />
          ),
        )}
      <Box mt={3} backgroundColor="teal" color="white" p={3}>
        <div style={{ whiteSpace: `pre-wrap` }}>{definition}</div>
      </Box>
    </div>
  );
};

export default Schema;
