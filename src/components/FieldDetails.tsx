import { HStack, Text, Divider } from '@chakra-ui/react';
import { Field } from '@contextdao/context';

interface Props {
  field: Field;
}

const FieldDetails = (props: Props) => {
  const { field } = props;
  return (
    <>
      <HStack>
        <Text>
          {field.name} : {field.array}
          {field.array === true && <>[</>}
          {field.type}
          {field.array === true && <>]</>}
          {field.required === true && <>!</>}
          <br />
          {field.description}
        </Text>
      </HStack>
      <Divider mb={3} />
    </>
  );
};

export default FieldDetails;
