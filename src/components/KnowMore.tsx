import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import litepaper from '../assets/pdf/context_litepaper.pdf';

export default function KnowMore() {
  return (
    <Box className="intro">
      <Container maxW={`4xl`}>
        <Stack
          as={Box}
          textAlign={`center`}
          spacing={{ base: 5, md: 10 }}
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
              More about CONTEXT? <br />
              <Text as={`span`} color={`primary`}>
                check out the litepaper:
              </Text>
            </Heading>
          </motion.div>
          <div>
            <a href={litepaper} download="contextDAO_litepaper">
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
                See litepaper
              </Button>
            </a>
          </div>
        </Stack>
      </Container>
    </Box>
  );
}
