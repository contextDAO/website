import { Badge } from '@chakra-ui/react';
interface Props {
  role: string;
}

const getColor = (role: string): string => {
  let color = `gray`;
  switch (role) {
    case `editor`:
      color = `green`;
      break;
    case `contributor`:
      color = `blue`;
      break;
    default:
      break;
  }
  return color;
};

const Role = (props: Props) => {
  const { role } = props;
  return (
    <Badge mx={`auto`} colorScheme={getColor(role)} variant="outline">
      {role}
    </Badge>
  );
};

export default Role;
