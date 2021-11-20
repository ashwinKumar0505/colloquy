import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    primary: {
      100: "#C4C6FF",
      200: "#A2A5FC",
      300: "#8888FC",
      400: "#5D55FA",
      500: "#5D55FA",
      600: "#4D3DF7",
      700: "#3525E6",
      800: "#1D0EBE",
      900: "#0C008C",
    },
  },
});

export default customTheme;
