import { Badge } from '@chakra-ui/react';
interface Props {
  status: string;
}

const getColor = (role: string): string => {
  let color = `gray`;
  switch (role) {
    case `proposal`:
      color = `orange`;
      break;
    case `open`:
      color = `blue`;
      break;
    case `approved`:
      color = `green`;
      break;
    case `abandoned`:
      color = `red`;
      break;
    default:
      break;
  }
  return color;
};

const Status = (props: Props) => {
  const { status } = props;
  return (
    <Badge
      fontSize="0.6em"
      mx={`auto`}
      colorScheme={getColor(status)}
      variant="outline"
    >
      {status}
    </Badge>
  );
};

export default Status;
