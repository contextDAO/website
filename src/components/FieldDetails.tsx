import { HStack, Text, Divider } from '@chakra-ui/react';
import { Field } from '@contextdao/context';
import styles from '@/styles/FieldDetails.module.css';

interface Props {
  field: Field;
}

const FieldDetails = (props: Props) => {
  const { field } = props;
  return (
    <>
      <HStack>
        <Text>
          <span className={styles.label}>{field.name}</span> : {field.array}
          {field.array === true && <>[</>}
          {field.type}
          {field.array === true && <>]</>}
          {field.required === true && <>!</>}
          <br />
          <span className={styles.description}>{field.description}</span>
        </Text>
      </HStack>
      <Divider mb={3} />
    </>
  );
};

export default FieldDetails;
