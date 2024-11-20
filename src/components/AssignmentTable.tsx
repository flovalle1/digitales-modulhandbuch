"use client";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef, GridRowsProp, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React from 'react';
import { cs, FieldOfStudy, getFieldOfStudy } from './config';



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

export default function AssignmentTable({ rows }: AssignmentTableProps) {
    const [fieldOfStudy, setFieldOfStudy] = React.useState<FieldOfStudy>(cs);
    const [extendedColumns, setExtendedColumns] = React.useState<GridColDef[]>([...columns, ...cs.content]);

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
    );
}