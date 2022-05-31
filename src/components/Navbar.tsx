import React, { useState } from 'react';
import { useColorModeValue, useBreakpointValue } from '@chakra-ui/react';
import { Text, Button, InputGroup, Input } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';
import { Flex, Box, Stack, Badge } from '@chakra-ui/react';
import { Stat, StatLabel, StatHelpText, StatNumber } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { ModalCloseButton } from '@chakra-ui/react';
import { JWKInterface } from '@unitedao/unite';
import Role from './Role';

const Navbar = () => {
  const { unite, saveWallet, user } = useDappContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [balance, setBalance] = useState(0);
  const handleNewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    fileReader.readAsText(file, `UTF-8`);
    fileReader.onload = async (readerEvt: any) => {
      const wallet = JSON.parse(readerEvt.currentTarget.result);
      const addr: string = await unite.arweave.wallets.getAddress(wallet);
      // const balance = await unite.arweave.wallets.getBalance(addr);
      // const ar = await unite.arweave.ar.winstonToAr(balance);
      // setBalance(parseFloat(ar));
      saveWallet(wallet as JWKInterface);
    };
  };

  return (
    <Box>
      <Flex
        bg="#24292F"
        color="#FFF"
        minH={`60px`}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={`solid`}
        borderColor={useColorModeValue(`gray.200`, `gray.900`)}
        align={`center`}
      >
        <Flex flex={{ base: 1 }} justify={{ base: `center`, md: `start` }}>
          <Text textAlign={useBreakpointValue({ base: `center` })}>
            <b>Unite DAO</b>
            <br />
            schemas
          </Text>
        </Flex>
        <Stack flex={{ base: 1, md: 0 }} justify={`flex-end`} direction={`row`}>
          {!user.address ? (
            <Button
              onClick={onOpen}
              display={{ base: `none`, md: `inline-flex` }}
              fontSize={`sm`}
              fontWeight={600}
              color={`white`}
              bg={`pink.400`}
              _hover={{
                bg: `pink.300`,
              }}
            >
              Connect Wallet
            </Button>
          ) : (
            <Text>{user.address}</Text>
          )}
        </Stack>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              {!user.address ? (
                <div>
                  <Text color="white">Wallet</Text>
                  <Input
                    type="file"
                    name="file"
                    accept={`application/JSON`}
                    onChange={handleNewFileUpload}
                  />
                </div>
              ) : (
                <div>
                  <Stat>
                    <StatLabel>Wallet</StatLabel>
                    <StatNumber>{balance} AR</StatNumber>
                    <StatHelpText fontSize="xs">{user.address}</StatHelpText>
                  </Stat>
                  <Role role={user.role} />
                </div>
              )}
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Navbar;
