import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Link,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

export default function Intro() {
  return (
    <Box className="intro">
      <Container maxW={`4xl`}>
        <Stack
          as={Box}
          textAlign={`center`}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: `easeOut`, duration: 1.5 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: `2xl`, sm: `4xl`, md: `6xl` }}
              lineHeight={`110%`}
            >
              Because data needs <br />
              <Text as={`span`} color={`primary`}>
                CONTEXT
              </Text>
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: `easeOut`, duration: 1.5 }}
            className="intro__text"
          >
            <Text color={`gray.500`}>
              {`Context is a framework to coordinate standards as Public Goods
            `}
            </Text>
            <Text color={`primary`} fontWeight={`bold`}>
              {`Context = SCHEMAS + DATA PODs + UNIVERSAL NAME SERVICE
            `}
            </Text>
          </motion.div>
          <Stack
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            direction={`column`}
            spacing={3}
            align={`center`}
            alignSelf={`center`}
            position={`relative`}
          >
            <Link href="/dapp" marginTop={-4}>
              <Button
                as={motion.button}
                bg={`secondary`}
                color={`white`}
                display={{ md: `inline-flex` }}
                fontWeight={600}
                whileHover={{ scale: 1.05 }}
                dragConstraints={{ left: -100, right: 100 }}
                _hover={{
                  bg: `primary`,
                }}
              >
                Go to Context
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
