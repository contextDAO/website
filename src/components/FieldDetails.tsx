import { Badge, HStack, Box, Text, Spacer, Divider } from '@chakra-ui/react';
import { LockIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { Field } from '@unitedao/unite';

interface Props {
  field: Field;
}

const getColor = (type: string): string => {
  let color = `gray`;
  switch (type) {
    case `string`:
      color = `orange`;
      break;
    case `integer`:
      color = `blue`;
      break;
    case `number`:
      color = `green`;
      break;
    case `boolean`:
      color = `purple`;
      break;
    default:
      break;
  }
  return color;
};

const FieldDetails = (props: Props) => {
  const { field } = props;
  return (
    <>
      <HStack>
        <Text>
          <b>{field.name}</b>
          <br />
          {field.description}
        </Text>
        <Spacer />
        <Box>
          {field.readOnly && <LockIcon color="green" w={3} h={3} mr={2} />}
          {field.required && <CheckCircleIcon color="red" w={3} h={3} mr={2} />}
          <Badge
            fontSize="0.6em"
            mx={`auto`}
            colorScheme={getColor(field.type)}
            variant="outline"
          >
            {field.type}
          </Badge>
        </Box>
      </HStack>
      <Divider />
    </>
  );
};

export default FieldDetails;
