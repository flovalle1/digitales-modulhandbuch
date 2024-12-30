"use client";
import FilterListIcon from '@mui/icons-material/FilterList';
import { Card, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef, GridRowsProp, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React from 'react';
import { cs, FieldOfStudy, getFieldOfStudy } from './config';
import TableDrawer from './TableDrawer';



export interface AssignmentTableProps {
    rows: GridRowsProp;
}

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


const columns: GridColDef[] = [
    { field: 'titel', headerName: 'Titel', width: 150 },
    { field: 'teachtype', headerName: 'Lehrform', width: 150 },
    { field: 'ects', headerName: 'ECTS', width: 150 },
    { field: 'code', headerName: 'Kennzeichnung', width: 150 },
    { field: 'lecturer', headerName: 'Dozent', width: 150 },
];

export type filterOption = {
    key: string,
}

export default function AssignmentTable({ rows }: AssignmentTableProps) {
    const [fieldOfStudy, setFieldOfStudy] = React.useState<FieldOfStudy>(cs);
    const [extendedColumns, setExtendedColumns] = React.useState<GridColDef[]>([...columns, ...cs.content]);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const [filterOption, setFilterOption] = React.useState<filterOption>({ key: 'cs' })

    React.useEffect(() => {
        setExtendedColumns([...columns, ...fieldOfStudy.content]);
    }, [fieldOfStudy]);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setFilterOption({ key: newAlignment });
        const fOS: FieldOfStudy = getFieldOfStudy(newAlignment);
        setFieldOfStudy(fOS);
    };

    return (
        <Stack sx={{ m: 4, p: 2 }} >
            <TableDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                filters={filterOption}
                changeFilter={setFilterOption}
            />

            <Grid container>
                <Grid size={5} >
                    <Card >
                        <Typography variant="h6" align="center">Bachelor Studiengänge</Typography>
                        <ToggleButtonGroup
                            color="primary"
                            value={filterOption.key}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
                        >
                            <ToggleButton value="cs">Informatik</ToggleButton>
                            <ToggleButton value="bio-cs">Bioinformatik</ToggleButton>
                            <ToggleButton value="media-cs">Medieninformatik</ToggleButton>
                            <ToggleButton value="medic-cs">Mediziniformatik</ToggleButton>
                        </ToggleButtonGroup>
                        <Typography variant="h6" align="center">Master Studiengänge</Typography>
                        <ToggleButtonGroup
                            color="primary"
                            value={filterOption.key}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
                        >
                            <ToggleButton value="cs">Informatik</ToggleButton>
                            <ToggleButton value="bio-cs">Bioinformatik</ToggleButton>
                            <ToggleButton value="media-cs">Medieninformatik</ToggleButton>
                            <ToggleButton value="medic-cs">Mediziniformatik</ToggleButton>
                        </ToggleButtonGroup>
                    </Card>
                </Grid>
            </Grid>



            <div style={{ width: '100%' }}>
                <DataGrid disableColumnMenu rows={rows} columns={extendedColumns} slots={{ toolbar: Toolbar }} slotProps={{ toolbar: { showQuickFilter: true } }} />
            </div>

            <Fab
                color="primary"
                aria-label="filter"
                sx={{ position: 'fixed', bottom: 16, left: 16 }}
                onClick={() => setDrawerOpen(!drawerOpen)}
            >
                <FilterListIcon />
            </Fab>
        </Stack >
    );
}