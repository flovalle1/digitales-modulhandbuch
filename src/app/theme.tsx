"use client";
import { createTheme } from "@mui/material/styles";
import { deDE } from '@mui/x-data-grid/locales';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  deDE,
);

export default theme;