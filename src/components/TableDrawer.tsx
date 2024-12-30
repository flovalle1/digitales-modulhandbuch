import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Card, Drawer, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import { filterOption } from './AssignmentTable';

export interface TableDrawerProps {
    open: boolean;
    onClose: () => void;
    filters: filterOption;
    changeFilter: (filter: filterOption) => void;
}

export default function TableDrawer({ open, onClose, filters, changeFilter }: TableDrawerProps) {
    const handleFieldChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        changeFilter({ key: newAlignment });
    };

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: 340,
                '& .MuiDrawer-paper': {
                    width: 340,
                    boxSizing: 'border-box',
                    p: 2
                },
            }}
        >
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Filter Options</Typography>
                    <IconButton onClick={onClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Stack>

                <Card sx={{ p: 2 }}>
                    <Typography variant="h6" align="center" gutterBottom>Bachelor Studiengänge</Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={filters.key}
                        exclusive
                        onChange={handleFieldChange}
                        orientation="vertical"
                        sx={{ width: '100%', mb: 2 }}
                    >
                        <ToggleButton value="cs">Informatik</ToggleButton>
                        <ToggleButton value="bio-cs">Bioinformatik</ToggleButton>
                        <ToggleButton value="media-cs">Medieninformatik</ToggleButton>
                        <ToggleButton value="medic-cs">Mediziniformatik</ToggleButton>
                    </ToggleButtonGroup>

                    <Typography variant="h6" align="center" gutterBottom>Master Studiengänge</Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={filters.key}
                        exclusive
                        onChange={handleFieldChange}
                        orientation="vertical"
                        sx={{ width: '100%' }}
                    >
                        <ToggleButton value="cs-m">Informatik</ToggleButton>
                        <ToggleButton value="bio-cs-m">Bioinformatik</ToggleButton>
                        <ToggleButton value="media-cs-m">Medieninformatik</ToggleButton>
                        <ToggleButton value="medic-cs-m">Mediziniformatik</ToggleButton>
                    </ToggleButtonGroup>
                </Card>
            </Stack>
        </Drawer>
    );
}
