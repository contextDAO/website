import {
  useColorModeValue,
  useBreakpointValue,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react';
import { Text, Button, InputGroup, Input } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';
import { Flex, Box, Stack } from '@chakra-ui/react';
import { Stat, StatLabel, StatHelpText, StatNumber } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { ModalCloseButton } from '@chakra-ui/react';
import { JWKInterface, Wallet } from '@contextdao/context';
import Role from './Role';
import Link from 'next/link';

const DappNavbar = () => {
  const { dapp, saveWallet, user } = useDappContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleNewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    fileReader.readAsText(file, `UTF-8`);
    fileReader.onload = async (readerEvt: any) => {
      const json: JWKInterface = JSON.parse(readerEvt.currentTarget.result);
      const wallet: Wallet = {
        json,
        address: await dapp.arweave.wallets.getAddress(json),
      };
      saveWallet(wallet);
      onClose();
    };
  };

  const logout = () => {
    saveWallet(null);
  };

  return (
    <Box>
      <Flex
        bg="#345AD5"
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
          <Stack>
            <Text textAlign={useBreakpointValue({ base: `center` })}>
              Data with <b>Context</b>
            </Text>
          </Stack>
        </Flex>

        <SimpleGrid columns={2} columnGap={3}>
          <GridItem colSpan={1}>
            <Stack>
              <Link href="/">
                <Button
                  bg={`secondary`}
                  color={`white`}
                  fontSize={`sm`}
                  fontWeight={600}
                  _hover={{ bg: `white`, color: `gray` }}
                >
                  Homepage
                </Button>
              </Link>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={`flex-end`}
              direction={`row`}
            >
              {!user.address ? (
                <Button
                  onClick={onOpen}
                  display={{ base: `none`, md: `inline-flex` }}
                  fontSize={`sm`}
                  fontWeight={600}
                  color={`white`}
                  bg="#42D5DD"
                  _hover={{
                    bg: `white`,
                    color: `gray`,
                  }}
                >
                  Connect Wallet
                </Button>
              ) : (
                <Box>
                  <Role role={user.role} />
                  <Button mr={3} onClick={logout} variant="outline" size="xs">
                    Logout
                  </Button>
                </Box>
              )}
            </Stack>
          </GridItem>
        </SimpleGrid>
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

export default DappNavbar;
