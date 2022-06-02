import { ChangeEvent, useState, useRef } from 'react';
import { Proposal, ProposalStatus, Field, FieldType } from '@unitedao/unite';
import { Text, Box, HStack, Spacer } from '@chakra-ui/react';
import { Heading, Input, Button, ButtonGroup } from '@chakra-ui/react';
import { Select, FormControl, FormLabel } from '@chakra-ui/react';
import { AddIcon, CloseIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { useToast, Stack, Checkbox } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';
import Status from './Status';
import FieldDetails from './FieldDetails';

interface FormProposal {
  proposalName: string;
  comment: string;
  fieldName: string;
  description: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  readOnly: boolean;
  required: boolean;
}

const Proposals = () => {
  const { unite, standard, standardState, user, initStandard } =
    useDappContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [action, setAction] = useState(`list`);
  const [index, setIndex] = useState(-1);
  const [proposal, setProposal] = useState<Proposal>({} as Proposal);
  const [formProposal, setFormProposal] = useState<FormProposal>(
    {} as FormProposal,
  );
  const toast = useToast();
  const ver = useRef();

  const handleChange = (
    evt: ChangeEvent<{
      value: string | boolean;
      name: string;
      checked: boolean;
    }>,
  ) => {
    const value: string | boolean = [`readOnly`, `required`].includes(
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
    setProposal(standardState.proposals[index]);
    setAction(`details`);
  };

  const updateStatus = async (status: ProposalStatus) => {
    const version =
      ver.current?.value && status === `approved` ? ver.current?.value : ``;
    await standard.updateProposal(index, status, version);
    await unite.mine();
    toast({
      title: `Proposal status updated`,
      description: `Proposal #${index} has now the status: ${status}`,
      status: `success`,
      duration: 4000,
      isClosable: true,
    });
    standardState.proposals[index].status = status;
    initStandard(standard.contractAddr);
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
      formProposal.comment === `` ||
      formProposal.fieldName === `` ||
      formProposal.description === ``
    ) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsLoading(true);
    await standard.addProposal(
      formProposal.proposalName,
      formProposal.comment,
      {
        name: formProposal.fieldName,
        description: formProposal.description,
        type: formProposal.type,
        readOnly: formProposal.readOnly,
        required: formProposal.required,
      } as Field,
    );
    await unite.mine();
    toast({
      title: `Proposal added`,
      description: `A new proposal has been added to the contract`,
      status: `success`,
      duration: 4000,
      isClosable: true,
    });
    initStandard(standard.contractAddr);
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
          <Box>
            {action === `list` &&
              user.role &&
              [`editor`, `contributor`].includes(user.role) && (
                <Button size="xs" w={5} h={5} onClick={() => setAction(`add`)}>
                  <AddIcon />
                </Button>
              )}
            {action !== `list` && (
              <Button size="xs" w={5} h={5} onClick={() => setAction(`list`)}>
                <CloseIcon />
              </Button>
            )}
          </Box>
        </HStack>
      </Box>
      {standardState.proposals?.length === 0 && (
        <Text m={12}>No Proposals</Text>
      )}
      {action === `list` &&
        standardState.proposals?.map((proposal: any, index: number) => (
          <HStack
            key={index}
            spacing="24px"
            borderBottom="1px"
            borderColor="gray.200"
            p={3}
          >
            <Box pl={6}>
              <Text>{proposal.name}</Text>
              <Text fontSize="xs">{proposal.comments.length} comments</Text>
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
            <Heading as="h2" size="md">
              {proposal.name}
            </Heading>
            <Status status={proposal.status} />
          </Box>
          <FieldDetails field={proposal.field} />
          {[`editor`, `contributor`].includes(user.role) && (
            <Box my={3}>
              <Heading as="h2" size="md" mb={3}>
                Actions
              </Heading>
              <HStack>
                {proposal.status === `open` && (
                  <Select fontSize="xs" h={6} w={32} ref={ver}>
                    <option>patch</option>
                    <option>minor</option>
                    <option>major</option>
                  </Select>
                )}
                {proposal.status === `proposal` && (
                  <Button
                    size="xs"
                    colorScheme="blue"
                    onClick={() => updateStatus(`open`)}
                  >
                    Open
                  </Button>
                )}
                {proposal.status === `open` && (
                  <Button
                    size="xs"
                    colorScheme="green"
                    onClick={() => updateStatus(`approved`)}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  size="xs"
                  colorScheme="red"
                  onClick={() => updateStatus(`abandoned`)}
                >
                  Abandon
                </Button>
              </HStack>
            </Box>
          )}
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
            <FormLabel mt={4} fontSize="sm" htmlFor="comment">
              Proposal rationale
            </FormLabel>
            <Input
              placeholder="Why do we need this field"
              name="comment"
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
          <Select placeholder="Select Type" name="type" onChange={handleChange}>
            <option value="string">String</option>
            <option value="integer">Integer</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
          </Select>
          <FormLabel mt={4} fontSize="sm" htmlFor="type">
            Characteristics
          </FormLabel>
          <Stack spacing={[1, 5]} direction={[`column`, `row`]}>
            <Checkbox
              name="readOnly"
              size="sm"
              colorScheme="green"
              onChange={handleChange}
            >
              ReadOnly
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
