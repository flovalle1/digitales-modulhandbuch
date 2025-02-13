"use client";
import { getCourse } from '@/actions/queries';
import { CourseWithLecturerCourseContent } from '@/types';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import Fab from '@mui/material/Fab';
import { DataGrid, GridColDef, GridRowsProp, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Lecturer } from '@prisma/client';
import React from 'react';
import { cs, FieldOfStudy, getFieldOfStudy } from './config';
import CourseDetails from './CourseDetails';
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
    lecturer: Lecturer | null;
}

type PreviewDialog = {
    open: boolean;
    courseId: number | null;
}

export default function AssignmentTable({ rows }: AssignmentTableProps) {
    const [fieldOfStudy, setFieldOfStudy] = React.useState<FieldOfStudy>(cs);
    const [extendedColumns, setExtendedColumns] = React.useState<GridColDef[]>([...columns, ...cs.content]);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [filterOption, setFilterOption] = React.useState<FilterOption>({ key: 'cs', assignments: [], lecturer: null });
    const [filteredRows, setFilteredRows] = React.useState(rows);
    const [previewDialogOpen, setPreviewDialogOpen] = React.useState<PreviewDialog>({ open: false, courseId: null });

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

        if (filterOption.lecturer) {
            setFilteredRows(rows.filter((row) => row.lecturer === filterOption.lecturer?.name));
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



    function CourseDialog({ open, courseId }: PreviewDialog) {
        const [course, setCourse] = React.useState<CourseWithLecturerCourseContent | null>(null);
        const [rlOpen, setRlOpen] = React.useState(false);

        React.useEffect(() => {
            if (courseId) {
                getCourse(courseId).then(setCourse).then(() => { if (open) setRlOpen(true); });
            }
        }, [courseId]);

        if (!courseId || !course) return null;

        return (
            <Dialog open={rlOpen} maxWidth={"xl"} fullWidth>
                <DialogTitle>Kursdetails</DialogTitle>
                <DialogContent>
                    <CourseDetails course={course} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => { setPreviewDialogOpen(prev => ({ ...prev, open: false })); setRlOpen(false) }} color="secondary">Schließen</Button>
                </DialogActions>
            </Dialog >
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
                <DataGrid
                    disableColumnMenu
                    rows={filteredRows}
                    columns={extendedColumns}
                    hideFooterSelectedRowCount
                    slots={{ toolbar: Toolbar }}
                    disableRowSelectionOnClick
                    getRowClassName={() => 'clickable-row'}
                    onCellClick={(params, event) => {
                        setPreviewDialogOpen({ open: true, courseId: params.row.id });
                    }}
                    sx={{
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-row:hover': {
                            cursor: 'pointer',
                        },
                    }}
                />
            </div>

            <Fab
                color="primary"
                aria-label="filter"
                sx={{ position: 'fixed', bottom: 16, left: 16 }}
                onClick={() => setDrawerOpen(!drawerOpen)}
            >
                <FilterListIcon />
            </Fab>
            {CourseDialog(previewDialogOpen)}
        </Stack >
    );
}