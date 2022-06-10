import { Text } from '@chakra-ui/react';
import { Heading, Input, Button, ButtonGroup } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';

interface Props {
  comments: Comment[];
}

const Comments = (props: Props) => {
  const { comments } = props;
  // const { unite, standard, standardName, standardState, user, initStandard } =
  // const toast = useToast();

  return (
    <div>
      <Heading as="h2" size="sm">
        Comments
      </Heading>
      {comments.length === 0 && <Text m={12}>No Comments</Text>}
      {comments.length > 0 &&
        comments.map((comment: Comment, index: number) => (
          <Text key={index}>{comment.text}</Text>
        ))}
    </div>
  );
};

export default Comments;
