import { extendTheme } from '@chakra-ui/react';

const index = extendTheme({
  colors: {
    primary: `#345AD5`,
    secondary: `#42D5DD`,
    thirdary: `#345AD5`,
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
});

export default index;
