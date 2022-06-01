import { ChangeEvent, useState } from 'react';
import { Text, Button, Box, HStack } from '@chakra-ui/react';
import { Heading, Input, ButtonGroup } from '@chakra-ui/react';
import { Select, FormControl, FormLabel } from '@chakra-ui/react';
import { useToast, Stack, Checkbox } from '@chakra-ui/react';
import { useDappContext } from '../context/dapp';

interface FormProposal {
  proposalName: string;
  comment: string;
  fieldName: string;
  description: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  isReadOnly: boolean;
  isRequired: boolean;
}

const Proposals = () => {
  const { unite, standard, standardState, user, initStandard } =
    useDappContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [addProposal, setAddProposal] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
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
    const value: string | boolean = [`isReadOnly`, `isRequired`].includes(
      evt.currentTarget.name,
    )
      ? evt.currentTarget.checked
      : evt.currentTarget.value;
    console.log(evt.currentTarget.value);
    setFormProposal({
      ...formProposal,
      [evt.currentTarget.name]: value,
    });
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
      formProposal.fieldName,
      formProposal.description,
      formProposal.type,
      formProposal.isReadOnly,
      formProposal.isRequired,
    );
    await unite.mine();
    toast({
      title: `Proposal added`,
      description: `A new proposal has been added to the contract`,
      status: `success`,
      duration: 4000,
      isClosable: true,
    });
    setIsLoading(false);
    initStandard(standard.contractAddr);
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
        Proposals
      </Box>
      {standardState.proposals?.length === 0 && (
        <Text m={12}>No Proposals</Text>
      )}
      {standardState.proposals?.map((proposal: any, index: number) => (
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
        </HStack>
      ))}
      {addProposal === false && user.role && user.role !== `none` && (
        <Box p={10}>
          <Button
            isLoading={isLoading}
            colorScheme="teal"
            variant="outline"
            onClick={() => {
              setAddProposal(true);
            }}
          >
            Add a Proposal
          </Button>
        </Box>
      )}
      {addProposal === true && (
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
          <Select
            placeholder="Select Type"
            name="type"
            onChange={(e) => handleChange(e)}
          >
            <option value="text">Text</option>
            <option value="numeric">Numeric</option>
            <option value="boolean">Boolean</option>
            <option value="select">Select</option>
          </Select>
          <FormLabel mt={4} fontSize="sm" htmlFor="type">
            Characteristics
          </FormLabel>
          <Stack spacing={[1, 5]} direction={[`column`, `row`]}>
            <Checkbox
              name="isReadOnly"
              size="sm"
              colorScheme="green"
              onChange={handleChange}
            >
              ReadOnly
            </Checkbox>
            <Checkbox
              name="isRequired"
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
                setAddProposal(false);
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
