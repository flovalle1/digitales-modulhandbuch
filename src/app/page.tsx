"use client";
import { createTheme, Stack, ThemeProvider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef, GridRowsProp, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { deDE } from '@mui/x-data-grid/locales';
import React from 'react';
import { cs, FieldOfStudy, getFieldOfStudy } from './config';


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
];

export default function Home() {
  const [fieldOfStudy, setFieldOfStudy] = React.useState<FieldOfStudy>(cs);
  const [extendedColumns, setExtendedColumns] = React.useState<GridColDef[]>([...columns, ...cs.content]);
  console.log(extendedColumns);

  React.useEffect(() => {
    setExtendedColumns([...columns, ...fieldOfStudy.content]);
  }, [fieldOfStudy]);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    console.log(newAlignment);
    const fOS: FieldOfStudy = getFieldOfStudy(newAlignment);
    setFieldOfStudy(fOS);
  };


  return (
    <ThemeProvider theme={theme}>
      <Stack sx={{ m: 4, p: 2 }}>
        <Grid container>
          <Grid size={4}>
            <ToggleButtonGroup
              color="primary"
              value={fieldOfStudy}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="cs">Informatik</ToggleButton>
              <ToggleButton value="bio-cs">Bioinformatik</ToggleButton>
              <ToggleButton value="media-cs">Medieninformatik</ToggleButton>
              <ToggleButton value="medic-cs">Mediziniformatik</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <div style={{ width: '100%' }}>
          <DataGrid disableColumnMenu rows={rows} columns={extendedColumns} slots={{ toolbar: Toolbar }} slotProps={{ toolbar: { showQuickFilter: true } }} />
        </div>
      </Stack>
    </ThemeProvider>
  );
}

