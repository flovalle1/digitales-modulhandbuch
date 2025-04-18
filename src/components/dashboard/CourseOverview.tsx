'use client';
import { deleteCourse } from '@/actions/mutations';
import { CourseWithLecturer } from '@/types';
import { Delete } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useNotifications } from '@toolpad/core';
import { useState } from 'react';

export interface CourseOverwievProps {
    courses: CourseWithLecturer[];
}

export default function CourseOverwiev({ courses }: CourseOverwievProps) {
    const notification = useNotifications();
    const [open, setOpen] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    function Toolbar() {
        return (
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mx: 3 }}>
                <GridToolbarQuickFilter
                    sx={{ mt: 2 }}
                    quickFilterParser={(searchInput: string) =>
                        searchInput
                            .split(',')
                            .map((value) => value.trim())
                            .filter((value) => value !== '')
                    }
                />
                <Typography variant="h6">Kurse</Typography>
            </Box>
        );
    }


    const handleClickOpen = (id: number) => {
        setSelectedCourseId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCourseId(null);
    };

    const handleDelete = async () => {
        if (selectedCourseId !== null) {
            try {
                await deleteCourse(selectedCourseId);
                handleClose();
                notification.show("Der Kurs wurde gelöscht.", {
                    severity: "success",
                    autoHideDuration: 3000,
                });
            } catch (error) {
                notification.show("Du bist nicht berechtigt einen Kurs zu löschen: " + error, {
                    severity: "error",
                    autoHideDuration: 3000,
                });
            }
        };
    }

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            minWidth: 70,
            disableColumnMenu: true,
            headerAlign: 'left'
        },
        {
            field: 'code',
            headerName: 'Kennung',
            minWidth: 100,
            disableColumnMenu: true,
            headerAlign: 'left'
        },
        {
            field: 'title',
            headerName: 'Vorlsungstitel',
            minWidth: 200,
            disableColumnMenu: true,
            headerAlign: 'left'
        },
        {
            field: 'lecturer',
            headerName: 'Dozent',
            minWidth: 150,
            disableColumnMenu: true,
            headerAlign: 'left'
        },
        {
            field: 'edit',
            headerName: 'Kurs Bearbeiten',
            minWidth: 130,
            disableColumnMenu: true,
            headerAlign: 'left',
            renderCell: (params) => (
                <Button
                    variant='contained'
                    size='small'
                    href={`/backend/courses/edit/${params.row.id}`}
                    style={{ marginLeft: 'auto' }}
                >
                    Öffnen
                </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Kurs Löschen',
            minWidth: 120,
            disableColumnMenu: true,
            headerAlign: 'left',
            renderCell: (params) => (
                <IconButton onClick={() => handleClickOpen(params.row.id)}>
                    <Delete
                        style={{ color: 'inherit' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'red')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                    />
                </IconButton>
            ),
        },
    ];

    const rows = courses.map((course) => {
        return { id: course.id, code: course.code, title: course.title, lecturer: course.lecturer?.name };
    });

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <>
            <Paper sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    slots={{ toolbar: Toolbar }}
                    pageSizeOptions={[5, 10, 50]}
                    autosizeOptions={{
                        columns: ['id', 'code', 'title', 'lecturer', 'edit'],
                        includeOutliers: true,
                        includeHeaders: true,
                    }}
                    sx={{
                        border: 0,
                        '& .MuiDataGrid-columnHeader': {
                            whiteSpace: 'normal',
                            lineHeight: 'normal'
                        }
                    }}
                    autosizeOnMount
                />
            </Paper>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>{"Kurs Löschen"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sind Sie sicher, dass Sie diesen Kurs löschen möchten?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="inherit">
                        Abbrechen
                    </Button>
                    <Button onClick={handleDelete} variant='contained' color="primary" autoFocus>
                        Löschen
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


