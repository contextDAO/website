import { useState, useEffect } from 'react';
import { Text, Link, Box, HStack, Image, Spacer } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';

interface Contributor {
  address: string;
  img: string;
  role: string;
}

const Contributors = () => {
  const { contributors, user } = useDappContext();
  const openChangeRole = (addr: string) => {
    console.log(addr);
  };

  const getColor = (role: string): string => {
    return `#00FF00`;
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
          {/* <Image src={contributor.img} style={{ width: '32px' }} /> */}
          <Text fontSize="xs">{contributor.address}</Text>
          <Spacer />
          <Box w={100}>
            {contributor.address === user.address && (
              <Text fontSize="xs">
                <b>You</b>
              </Text>
            )}
            <Text fontSize="xs" color={getColor(contributor.role)}>
              {contributor.role}
            </Text>
            {/* contributor.role === `editor` && contributor.role !== `editor` && (<Link onClick={() => openChangeRole(user.address)} fontSize="xs">change</Link>) */}
          </Box>
        </HStack>
      ))}
    </div>
  );
};

export default Contributors;
