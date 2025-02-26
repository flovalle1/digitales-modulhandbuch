"use client";
import { getCourse } from '@/actions/queries';
import { CourseWithLecturerCourseContent } from '@/types';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Language, Lecturer, Semester } from '@prisma/client';
import React from 'react';
import { cs, FieldOfStudy, getFieldOfStudy } from '../config';
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
    nextOffer: {
        year: number;
        semester: Semester
    } | null;
    language: Language | null;
}

type PreviewDialog = {
    open: boolean;
    courseId: number | null;
}

export default function AssignmentTable({ rows }: AssignmentTableProps) {
    const [fieldOfStudy, setFieldOfStudy] = React.useState<FieldOfStudy>(cs);
    const [extendedColumns, setExtendedColumns] = React.useState<GridColDef[]>([...columns, ...cs.content]);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [filterOption, setFilterOption] = React.useState<FilterOption>({ key: 'cs', assignments: [], lecturer: null, nextOffer: null, language: null });
    const [filteredRows, setFilteredRows] = React.useState(rows);
    const [previewDialogOpen, setPreviewDialogOpen] = React.useState<PreviewDialog>({ open: false, courseId: null });

    React.useEffect(() => {
        setExtendedColumns([...columns, ...fieldOfStudy.content]);
    }, [fieldOfStudy]);

    React.useEffect(() => {
        setFieldOfStudy(getFieldOfStudy(filterOption.key));

        let tmpRows = rows;
        if (filterOption.assignments?.length) {
            tmpRows = tmpRows.filter((row) =>
                filterOption.assignments.every((assignment) => row[assignment])
            );
        }
        if (filterOption.lecturer) {
            tmpRows = tmpRows.filter((row) =>
                row.lecturer === filterOption.lecturer?.name
            );
        }
        if (filterOption.nextOffer) {
            tmpRows = tmpRows.filter((row) =>
                row.year === filterOption.nextOffer?.year
                && row.semester === filterOption.nextOffer?.semester
            );
        }

        if (filterOption.language) {
            tmpRows = tmpRows.filter((row) =>
                row.language === filterOption.language
            );
        }
        setFilteredRows(tmpRows);
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
        }, [courseId, open]);

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
                    onCellClick={(params) => {
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

            {CourseDialog(previewDialogOpen)}
        </Stack >
    );
}