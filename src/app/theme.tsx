"use client";
import { createTheme } from "@mui/material/styles";
import { deDE } from '@mui/x-data-grid/locales';


const themeProps = {
  palette: {
    primary: {
      main: '#A51E37',
    },
    secondary: {
      main: '#707070',
    },
  },
};

const theme = createTheme(
  themeProps,
  deDE,
);



export default theme;
export { themeProps };
