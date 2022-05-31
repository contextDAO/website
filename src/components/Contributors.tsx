import { Text, Button, Box, HStack, Spacer } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useDappContext } from '../context/dapp';
import Avatar from './Avatar';
import Role from './Role';

interface Contributor {
  address: string;
  img: string;
  role: string;
}

const Contributors = () => {
  const { standard, contributors, user, unite, initStandard } =
    useDappContext();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleIncorporateDapp = async () => {
    setIsLoading(true);
    await standard.register(user.wallet);
    await unite.mine();
    toast({
      title: `User registered`,
      description: `Your wallet has been registered as a user in the standard`,
      status: `success`,
      position: `bottom`,
    });
    setIsLoading(false);
    initStandard(standard.contractAddr);
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
          rounded="lg"
          borderColor={
            user.address === contributor.address ? `gray.600` : `gray.200`
          }
        >
          <Avatar indexOfContributor={index} />
          <Text fontSize="xs">{contributor.address}</Text>
          <Spacer />
          <Box w={100}>
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
            isLoading={isLoading}
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
