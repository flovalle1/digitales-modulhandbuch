import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Card, Drawer, IconButton, Stack, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import { filterOption } from './AssignmentTable';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export interface TableDrawerProps {
    open: boolean;
    onClose: () => void;
    filters: filterOption;
    changeFilter: (filter: filterOption) => void;
}

export default function TableDrawer({ open, onClose, filters, changeFilter }: TableDrawerProps) {
    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

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
                    <Typography variant="h5">Filter</Typography>
                    <IconButton onClick={onClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Stack>

                <Card sx={{ p: 2 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'center', display: 'flex' }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Bachelor" />
                            <Tab label="Master" />
                        </Tabs>
                    </Box>

                    <CustomTabPanel value={tabValue} index={0}>
                        <ToggleButtonGroup
                            color="primary"
                            value={filters.key}
                            exclusive
                            onChange={handleFieldChange}
                            orientation="vertical"
                            sx={{ width: '100%' }}
                        >
                            <ToggleButton value="cs">Informatik</ToggleButton>
                            <ToggleButton value="bio-cs">Bioinformatik</ToggleButton>
                            <ToggleButton value="media-cs">Medieninformatik</ToggleButton>
                            <ToggleButton value="medic-cs">Medizininformatik</ToggleButton>
                        </ToggleButtonGroup>
                    </CustomTabPanel>

                    <CustomTabPanel value={tabValue} index={1}>
                        <ToggleButtonGroup
                            color="primary"
                            value={filters.key}
                            exclusive
                            onChange={handleFieldChange}
                            orientation="vertical"
                            sx={{ width: '100%' }}
                        >
                            <ToggleButton value="cs-master">Informatik</ToggleButton>
                            <ToggleButton value="bio-cs-master">Bioinformatik</ToggleButton>
                            <ToggleButton value="media-cs-master">Medieninformatik</ToggleButton>
                            <ToggleButton value="medic-cs-master">Medizininformatik</ToggleButton>
                            <ToggleButton value="machine-learning-master">Machine Learning</ToggleButton>
                        </ToggleButtonGroup>
                    </CustomTabPanel>
                </Card>
            </Stack>
        </Drawer>
    );
}
