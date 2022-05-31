import { useState } from 'react';
import { Text, Button, Box, HStack, Spacer } from '@chakra-ui/react';
import { useDisclosure, Modal, ModalOverlay } from '@chakra-ui/react';
import { ModalBody, ModalContent, ModalHeader } from '@chakra-ui/react';
import { ModalCloseButton, ModalFooter } from '@chakra-ui/react';
import { Select, FormControl, FormLabel } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
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
  const [address, setAddress] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [role, setRole] = useState(``);
  const [isError, setShowErrorMsg] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    setRole(target.value);
    console.log(target.value);
  };

  const openChangeRole = (addr: string) => {
    setAddress(addr);
    setRole(``);
    onOpen();
    console.log(addr);
  };

  const handleChangeRole = async () => {
    console.log(role, address);
    if (role === `editor` || role === `contributor` || role === `user`) {
      setShowErrorMsg(false);
      onClose();
      await standard.setRole(role, address);
      await unite.mine();
      toast({
        title: `User updated`,
        description: `User with address ${address} now has role ${role}`,
        status: `success`,
        position: `bottom`,
      });
      setIsLoading(false);
      initStandard(standard.contractAddr);
    } else {
      setShowErrorMsg(true);
      return;
    }
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
          <Box w={100} textAlign="center">
            <Role role={contributor.role} />
          </Box>
          <Box w={50}>
            <HStack>
              {user.role === `editor` && contributor.role !== `editor` && (
                <Button
                  onClick={() => openChangeRole(contributor.address)}
                  p={0}
                >
                  <EditIcon />
                </Button>
              )}
            </HStack>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add contributor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {address}
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="contributor">Contributor</FormLabel>
              <Select
                placeholder="Select option"
                onChange={(e) => handleChange(e)}
              >
                <option value="editor">Editor</option>
                <option value="contributor">Contributor</option>
                <option value="user">User</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              variant="outline"
              mr={3}
              onClick={handleChangeRole}
            >
              Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Contributors;
