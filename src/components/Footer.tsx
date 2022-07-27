import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
} from '@chakra-ui/react';
import { FaTwitter, FaDiscord } from 'react-icons/fa';
import { ReactNode } from 'react';
import logo from '../../public/media/images/logo_footer.png';

const Logo = (props: any) => {
  return (
    <Box>
      <Image src={`logo`} />
    </Box>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue(`blackAlpha.100`, `whiteAlpha.100`)}
      rounded={`full`}
      w={8}
      h={8}
      cursor={`pointer`}
      as={`a`}
      href={href}
      display={`inline-flex`}
      alignItems={`center`}
      justifyContent={`center`}
      transition={`background 0.3s ease`}
      _hover={{
        bg: useColorModeValue(`blackAlpha.200`, `whiteAlpha.200`),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box className="footer" bg={`gray.50`} color={`gray.700`}>
      <Container
        as={Stack}
        maxW={`6xl`}
        py={4}
        direction={{ base: `column`, md: `row` }}
        spacing={4}
        justify={{ base: `center`, md: `space-between` }}
        align={{ base: `center`, md: `center` }}
      >
        <Logo />
        <Text>© 2022 Context DAO. All rights reserved</Text>
        <Stack direction={`row`} spacing={6}>
          <SocialButton label={`Twitter`} href={`#`}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={`Discord`} href={`#`}>
            <FaDiscord />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
