'use client';
import { deleteLecturer } from '@/actions/mutations';
import { Delete } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Lecturer } from '@prisma/client';
import { useNotifications } from '@toolpad/core';
import { useState } from 'react';

export interface LecturerOverviewProps {
    lecturers: Lecturer[];
}

export default function LecturerOverview({ lecturers }: LecturerOverviewProps) {
    const notification = useNotifications();
    const [open, setOpen] = useState(false);
    const [selectedLecturerId, setSelectedLecturerId] = useState<number | null>(null);

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
                <Typography variant="h6">Dozenten</Typography>
            </Box>
        );
    }

    const handleClickOpen = (id: number) => {
        setSelectedLecturerId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedLecturerId(null);
    };

    const handleDelete = async () => {
        if (selectedLecturerId !== null) {
            try {
                await deleteLecturer(selectedLecturerId);
                handleClose();
                notification.show("Der Dozent wurde gelöscht.", {
                    severity: "success",
                    autoHideDuration: 3000,
                });
            } catch (error) {
                notification.show("Du bist nicht berechtigt einen Dozenten zu löschen: " + error, {
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
            field: 'name',
            headerName: 'Name',
            minWidth: 150,
            disableColumnMenu: true,
            headerAlign: 'left'
        },
        {
            field: 'delete',
            headerName: 'Dozent Löschen',
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

    const rows = lecturers.map((lecturer) => {
        return { id: lecturer.id, name: lecturer.name };
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
                        columns: ['id', 'name', 'delete'],
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
                <DialogTitle>{"Dozent Löschen"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sind Sie sicher, dass Sie diesen Dozenten löschen möchten?
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