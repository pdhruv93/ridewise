import { createTheme } from '@mui/material/styles';

let customTheme = createTheme({
  palette: {
    background: {
      default: '#f7f1f0',
    },
    primary: {
      main: '#3984cd',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

customTheme = createTheme(customTheme, {
  typography: {
    h3: {
      color: customTheme.palette.primary.main,
    },
  },
});

export default customTheme;
