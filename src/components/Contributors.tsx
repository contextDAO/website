import { useState } from 'react';
import { Text, Button, Box, HStack, Spacer } from '@chakra-ui/react';
import { useDisclosure, Modal, ModalOverlay } from '@chakra-ui/react';
import { ModalBody, ModalContent, ModalHeader } from '@chakra-ui/react';
import { ModalCloseButton, ModalFooter } from '@chakra-ui/react';
import { Select, FormControl, FormLabel } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { useDappContext } from '../context/dapp';
import {
  addContributor,
  editContributor,
  mineBlock,
} from '@contextdao/context';
import Avatar from './Avatar';
import Role from './Role';

interface Contributor {
  address: string;
  img: string;
  role: string;
}

const Contributors = () => {
  const { contributors, user, dapp, initSchema, schemaState } =
    useDappContext();
  const [address, setAddress] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isError, setShowErrorMsg] = useState(false);
  const [role, setRole] = useState(`user`);

  const toast = useToast();

  const handleIncorporateDapp = async () => {
    setIsLoading(true);

    console.log(dapp);
    await addContributor(dapp, schemaState.schemaId);
    await mineBlock(dapp.arweave);
    toast({
      title: `User registered`,
      description: `Your wallet has been registered as a user in the standard`,
      status: `success`,
      position: `bottom`,
    });
    setIsLoading(false);
    initSchema(schemaState.schemaId);
  };

  const openChangeRole = (_address: string, _role: string) => {
    setAddress(_address);
    setRole(_role);
    onOpen();
  };

  const updateRole = (evt: any) => {
    const newRole = evt.target.value;
    setRole(newRole);
  };

  const handleChangeRole = async () => {
    if (role === `editor` || role === `contributor` || role === `user`) {
      setShowErrorMsg(false);
      onClose();
      await editContributor(dapp, schemaState.schemaId, address, role);
      await mineBlock(dapp.arweave);
      toast({
        title: `User updated`,
        description: `User with address ${address} now has role ${role}`,
        status: `success`,
        position: `bottom`,
      });
      setIsLoading(false);
      initSchema(schemaState.schemaId);
    } else {
      setShowErrorMsg(true);
      return;
    }
  };

  return (
    <div>
      <Box
        backgroundColor="#F6F8FA"
        p={4}
        mb={3}
        borderBottom="1px"
        borderColor="gray.200"
      >
        <HStack>
          <Text>Contributors</Text>
          <Spacer />
          <Box>
            {user.role === `none` && (
              <Button size="xs" w={5} h={5} onClick={handleIncorporateDapp}>
                <AddIcon />
              </Button>
            )}
          </Box>
        </HStack>
      </Box>
      {contributors.map((contributor: Contributor, index: number) => (
        <HStack
          key={index}
          spacing="24px"
          borderBottom="1px"
          borderColor="gray.200"
          p={3}
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
                  onClick={() =>
                    openChangeRole(contributor.address, contributor.role)
                  }
                  p={0}
                >
                  <EditIcon />
                </Button>
              )}
            </HStack>
          </Box>
        </HStack>
      ))}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="xs">{address}</Text>
            <FormControl isInvalid={isError}>
              <FormLabel htmlFor="contributor">Role</FormLabel>
              <Select value={role} onChange={(e) => updateRole(e)}>
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
