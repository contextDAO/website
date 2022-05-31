import { Text, Button, Box, HStack, Spacer } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';
import Avatar from './Avatar';
import Role from './Role';

interface Contributor {
  address: string;
  img: string;
  role: string;
}

const Contributors = () => {
  const { standard, contributors, user } = useDappContext();

  const handleIncorporateDapp = async () => {
    await standard.register(user.wallet);
  };

  const openChangeRole = (addr: string) => {
    console.log(addr);
  };

  return (
    <div>
      {contributors.map((contributor: Contributor, index: number) => (
        <HStack
          key={index}
          spacing="24px"
          m={2}
          p={3}
          backgroundColor="white"
          border="1px"
          borderColor="gray.200"
          rounded="lg"
        >
          <Avatar indexOfContributor={index} />
          <Text fontSize="xs">{contributor.address}</Text>
          <Spacer />
          <Box w={100}>
            {contributor.address === user.address && (
              <Text fontSize="xs">
                <b>You</b>
              </Text>
            )}
            <Role role={contributor.role} />
            {user.role === `editor` && contributor.role !== `editor` && (
              <Button
                onClick={() => openChangeRole(user.address)}
                fontSize="xs"
              >
                change
              </Button>
            )}
          </Box>
        </HStack>
      ))}
      {user.role === `none` && (
        <Box>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={handleIncorporateDapp}
          >
            Join this Dapp
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Contributors;
