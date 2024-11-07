"use client";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { createTheme, Stack, ThemeProvider } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { deDE } from '@mui/x-data-grid/locales';
const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  deDE,
);

function Toolbar() {
  return (
    <div>
      <GridToolbarFilterButton />
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput: string) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
      />
    </div>
  );
}

const rows: GridRowsProp = [
  { id: 1, titel: 'Mathematik I', teachtype: 'Vorlesung', ects: 6, code: 'MAT101', lecturer: 'Dr. Müller', action: true },
  { id: 2, titel: 'Informatik I', teachtype: 'Vorlesung', ects: 6, code: 'INF101', lecturer: 'Prof. Schmidt', action: false },
  { id: 3, titel: 'Physik I', teachtype: 'Vorlesung', ects: 4, code: 'PHY101', lecturer: 'Dr. Weber' },
  { id: 4, titel: 'Chemie I', teachtype: 'Vorlesung', ects: 5, code: 'CHE101', lecturer: 'Dr. Fischer' },
  { id: 5, titel: 'Biologie I', teachtype: 'Vorlesung', ects: 3, code: 'BIO101', lecturer: 'Dr. Becker' },
];

const columns: GridColDef[] = [
  { field: 'titel', headerName: 'Titel', width: 150 },
  { field: 'teachtype', headerName: 'Lehrform', width: 150 },
  { field: 'ects', headerName: 'ECTS', width: 150 },
  { field: 'code', headerName: 'Kennzeichnung', width: 150 },
  { field: 'lecturer', headerName: 'Dozent', width: 150 },
  {
    field: 'action',
    headerName: 'Aktion',
    width: 150,
    renderCell: (params) => (
      params.value ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />
    ),
  }
];

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ m: 4, p: 2, bgcolor: "white" }}>
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid disableColumnMenu rows={rows} columns={columns} slots={{ toolbar: Toolbar }} slotProps={{ toolbar: { showQuickFilter: true } }} />
        </div>
      </Stack>
    </ThemeProvider>
  );
}

