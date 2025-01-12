"use client";
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Chip, Stack } from "@mui/material";
import Fab from '@mui/material/Fab';
import { DataGrid, GridColDef, GridRowsProp, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React from 'react';
import { cs, FieldOfStudy, getFieldOfStudy } from './config';
import TableDrawer from './TableDrawer';



export interface AssignmentTableProps {
    rows: GridRowsProp;
}

const columns: GridColDef[] = [
    { field: 'titel', headerName: 'Titel', width: 150 },
    { field: 'teachtype', headerName: 'Lehrform', width: 150 },
    { field: 'ects', headerName: 'ECTS', width: 150 },
    { field: 'code', headerName: 'Kennzeichnung', width: 150 },
    { field: 'lecturer', headerName: 'Dozent', width: 150 },
];

export type FilterOption = {
    key: string;
    assignments: string[];
}

export default function AssignmentTable({ rows }: AssignmentTableProps) {
    const [fieldOfStudy, setFieldOfStudy] = React.useState<FieldOfStudy>(cs);
    const [extendedColumns, setExtendedColumns] = React.useState<GridColDef[]>([...columns, ...cs.content]);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [filterOption, setFilterOption] = React.useState<FilterOption>({ key: 'cs', assignments: [] }); // updated
    const [filteredRows, setFilteredRows] = React.useState(rows);

    React.useEffect(() => {
        setExtendedColumns([...columns, ...fieldOfStudy.content]);
    }, [fieldOfStudy]);

    React.useEffect(() => {
        setFieldOfStudy(getFieldOfStudy(filterOption.key));

        if (filterOption.assignments?.length) {
            setFilteredRows(rows.filter((row) => filterOption.assignments.every((assignment) => row[assignment])));
        } else {
            setFilteredRows(rows);
        }
    }, [filterOption, rows]);

    function Toolbar() {
        return (
            <Box display="flex" justifyContent="space-between" alignItems="center"
                sx={{ width: '100%', p: 1 }}>
                <Button
                    onClick={() => setDrawerOpen(true)}
                    variant="contained"
                >
                    Filter
                </Button>
                <GridToolbarQuickFilter
                    quickFilterParser={(searchInput: string) =>
                        searchInput
                            .split(',')
                            .map((value) => value.trim())
                            .filter((value) => value !== '')
                    }
                />
                <Chip color="primary" label={fieldOfStudy.id} />
            </Box>
        );
    }

    return (
        <Stack sx={{ m: 4, p: 2 }} >
            <TableDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                filters={filterOption}
                changeFilter={setFilterOption}
            />

            <div style={{ width: '100%' }}>
                <DataGrid disableColumnMenu rows={filteredRows} columns={extendedColumns} slots={{ toolbar: Toolbar }} />
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