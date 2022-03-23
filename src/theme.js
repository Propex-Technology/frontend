import { createTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

const PropexBlue = blue;
for(let i in PropexBlue) PropexBlue[i] = "#3347ff";

const themeOptions = {
  palette: {
    type: "light",
    primary: PropexBlue,
    secondary: blue, // "#3898EC",
    error: red,
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
    MuiCard: {
      root: {
        borderRadius: 8,
      },
    },
    MuiFab: {
      root: {
        textTransform: "none",
      },
    },
  },
};

export const Theme = createTheme({
  ...themeOptions,
});

export const FooterTheme = createTheme({
  ...themeOptions,
  palette: {
    type: "dark",
  },
});
