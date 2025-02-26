'use client';
import { deleteUser } from '@/actions/mutations';
import { UserWithLecturer } from '@/types';
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

export interface UserOverviewProps {
    users: UserWithLecturer[];
}

export default function UserOverview({ users }: UserOverviewProps) {
    const notification = useNotifications();
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

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
                <Typography variant="h6">Benutzer</Typography>
            </Box>
        );
    }

    const handleClickOpen = (id: string) => {
        setSelectedUserId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUserId(null);
    };

    const handleDelete = async () => {
        if (selectedUserId !== null) {
            try {
                await deleteUser(selectedUserId);
                handleClose();
                notification.show("Der Benutzer wurde gelöscht.", {
                    severity: "success",
                    autoHideDuration: 3000,
                });
            } catch (error) {
                notification.show("Du bist nicht berechtigt einen Benutzer zu löschen: " + error, {
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
            field: 'email',
            headerName: 'Email',
            minWidth: 200,
            disableColumnMenu: true,
            headerAlign: 'left'
        },
        {
            field: 'role',
            headerName: 'Rolle',
            minWidth: 100,
            disableColumnMenu: true,
            headerAlign: 'left'
        },
        {
            field: 'lecturerId',
            headerName: 'Verknüpfter Dozent ID',
            minWidth: 100,
            disableColumnMenu: true,
            headerAlign: 'left'
        },
        {
            field: 'lecturerName',
            headerName: 'Verknüpfter Dozent Name',
            minWidth: 100,
            disableColumnMenu: true,
            headerAlign: 'left'
        },
        {
            field: 'delete',
            headerName: 'Benutzer Löschen',
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

    const rows = users.map((user) => {
        return { id: user.id, name: user.name, email: user.email, role: user.role, lecturerId: user.lecturerId, lecturerName: user.lecturer?.name };
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
                        columns: ['id', 'name', 'email', 'role', 'delete'],
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
                <DialogTitle>{"Benutzer Löschen"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?
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
