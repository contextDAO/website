import { ChangeEvent, useState } from 'react';
import {
  Proposal,
  ProposalStatus,
  addProposal,
  editProposal,
  Field,
  mineBlock,
} from '@contextdao/context';
import { Text, Box, HStack, Spacer } from '@chakra-ui/react';
import { Heading, Input, Button, ButtonGroup } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { AddIcon, CloseIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { useToast, Stack, Checkbox } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';
import Status from './Status';
import FieldDetails from './FieldDetails';

interface FormProposal {
  proposalName: string;
  fieldName: string;
  description: string;
  type: string;
  array: boolean;
  required: boolean;
}

function isField(field: Field | undefined): field is Field {
  return (field as Field).name !== undefined;
}

const Proposals = () => {
  const { dapp, schemaState, user, initSchema } = useDappContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [action, setAction] = useState(`list`);
  const [index, setIndex] = useState(-1);
  const [proposal, setProposal] = useState<Proposal>({} as Proposal);
  const [formProposal, setFormProposal] = useState<FormProposal>(
    {} as FormProposal,
  );
  const toast = useToast();

  const handleChange = (
    evt: ChangeEvent<{
      value: string | boolean;
      name: string;
      checked: boolean;
    }>,
  ) => {
    const value: string | boolean = [`array`, `required`].includes(
      evt.currentTarget.name,
    )
      ? evt.currentTarget.checked
      : evt.currentTarget.value;
    setFormProposal({
      ...formProposal,
      [evt.currentTarget.name]: value,
    });
  };

  const detailsProposal = (index: number) => {
    setIndex(index);
    setProposal(schemaState.proposals[index]);
    setAction(`details`);
  };

  const updateStatus = async (status: ProposalStatus) => {
    await editProposal(dapp, schemaState.schemaId, index, status);
    await mineBlock(dapp.arweave);

    toast({
      title: `Proposal status updated`,
      description: `Proposal #${index} has now the status: ${status}`,
      status: `success`,
      duration: 4000,
      isClosable: true,
    });
    schemaState.proposals[index].status = status;
    initSchema(schemaState.schemaId);
  };

  const handleAddProposal = async () => {
    if (!user || user.role === `none`) {
      toast({
        title: `Not a contributor`,
        description: `To add a new proposal you need to be a contributor`,
        status: `error`,
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    if (
      formProposal.proposalName === `` ||
      formProposal.fieldName === `` ||
      formProposal.description === ``
    ) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsLoading(true);
    const field: Field = {
      name: formProposal.fieldName,
      description: formProposal.description,
      type: formProposal.type,
      required: formProposal.required,
      array: formProposal.array,
    };
    await addProposal(
      dapp,
      schemaState.schemaId,
      formProposal.fieldName,
      field,
    );
    await mineBlock(dapp.arweave);
    toast({
      title: `Proposal added`,
      description: `A new proposal has been added to the contract`,
      status: `success`,
      duration: 4000,
      isClosable: true,
    });
    initSchema(schemaState.schemaId);
    setIsLoading(false);
    setAction(`list`);
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
          <Text>Proposals</Text>
          <Spacer />
          {action === `details` && proposal.status === `proposal` && (
            <HStack>
              <Button
                size="xs"
                mr={2}
                colorScheme="green"
                onClick={() => updateStatus(`approved`)}
              >
                Approve
              </Button>
              <Button
                size="xs"
                mr={2}
                colorScheme="red"
                onClick={() => updateStatus(`abandoned`)}
              >
                Abandon
              </Button>
            </HStack>
          )}
          {action !== `list` && (
            <Button size="xs" w={5} h={5} onClick={() => setAction(`list`)}>
              <CloseIcon />
            </Button>
          )}
          {action === `list` &&
            user.role &&
            [`editor`, `contributor`].includes(user.role) && (
              <Button size="xs" w={5} h={5} onClick={() => setAction(`add`)}>
                <AddIcon />
              </Button>
            )}
        </HStack>
      </Box>
      {schemaState.proposals?.length === 0 && action === `list` && (
        <Text m={12}>No Proposals</Text>
      )}
      {action === `list` &&
        schemaState.proposals?.map((proposal: any, index: number) => (
          <HStack
            key={index}
            spacing="24px"
            borderBottom="1px"
            borderColor="gray.200"
            p={3}
          >
            <Box pl={6}>
              <Text>{proposal.name}</Text>
            </Box>
            <Spacer />
            <Box>
              <Status status={proposal.status} />
              <Button
                size="xs"
                ml={3}
                w={6}
                h={6}
                onClick={() => detailsProposal(index)}
              >
                <InfoOutlineIcon />
              </Button>
            </Box>
          </HStack>
        ))}
      {action === `details` && proposal && (
        <Box p="10">
          <Box mb={3}>
            <Status status={proposal.status} />
            <Heading as="h2" size="md">
              {proposal.name}
            </Heading>
          </Box>
          {isField(proposal.field) && <FieldDetails field={proposal.field} />}
          <Box mt={3}>
            <Heading as="h2" size="s">
              History
            </Heading>
            <Text fontSize="xs">
              Created: {new Date(proposal.createdDate * 1000).toISOString()}
            </Text>
            {proposal.updatedDate && (
              <Text fontSize="xs">
                Updated:
                {new Date(proposal.updatedDate * 1000).toISOString()}
              </Text>
            )}
          </Box>
        </Box>
      )}
      {action === `add` && (
        <Box p={10}>
          <Heading as="h2" size="sm">
            Proposal
          </Heading>
          <FormControl>
            <FormLabel mt={4} fontSize="sm" htmlFor="proposalName">
              Proposal Name
            </FormLabel>
            <Input
              placeholder="Name of the proposal"
              name="proposalName"
              onChange={handleChange}
            />
            <Heading as="h2" size="sm" mt={6}>
              Field
            </Heading>
            <FormLabel mt={4} fontSize="sm" htmlFor="fieldName">
              Field Name
            </FormLabel>
            <Input
              placeholder="Name of the Field"
              name="fieldName"
              onChange={handleChange}
            />
            <FormLabel mt={4} fontSize="sm" htmlFor="description">
              Description
            </FormLabel>
            <Input
              placeholder="Description"
              name="description"
              onChange={handleChange}
            />
          </FormControl>
          <FormLabel mt={4} fontSize="sm" htmlFor="type">
            Type
          </FormLabel>
          <Input
            placeholder="Type: Srting, Int, Boolean..."
            name="type"
            onChange={handleChange}
          />
          <FormLabel mt={4} fontSize="sm" htmlFor="type">
            Characteristics
          </FormLabel>
          <Stack spacing={[1, 5]} direction={[`column`, `row`]}>
            <Checkbox
              name="array"
              size="sm"
              colorScheme="green"
              onChange={handleChange}
            >
              Array
            </Checkbox>
            <Checkbox
              name="required"
              size="sm"
              colorScheme="green"
              onChange={handleChange}
            >
              Required
            </Checkbox>
          </Stack>
          {isError && (
            <Text color="red" fontSize="xs">
              All fields are mandatory
            </Text>
          )}
          <ButtonGroup variant="outline" spacing="6" mt={3}>
            <Button
              isLoading={isLoading}
              onClick={handleAddProposal}
              colorScheme="teal"
            >
              Add
            </Button>
            <Button
              onClick={() => {
                setAction(`list`);
              }}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </div>
  );
};

export default Proposals;
