import { getCurrentSemester, increaseSemester } from '@/lib/semester';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Card, CardContent, CardHeader, Chip, Drawer, IconButton, MenuItem, Select, SelectChangeEvent, Stack, Tab, Tabs, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Assignment, Language, Lecturer, Semester } from '@prisma/client';
import React from 'react';
import { getLecturers } from '../actions/queries';
import { FilterOption } from './AssignmentTable';
import { getHeaderName } from './config';

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
    filters: FilterOption;
    changeFilter: (filter: FilterOption) => void;
}

export default function TableDrawer({ open, onClose, filters, changeFilter }: TableDrawerProps) {
    const { semester: currentSemester, year: currentYear } = getCurrentSemester();
    const { semester: nextSemester, year: nextYear } = increaseSemester(currentSemester, currentYear);

    const [tabValue, setTabValue] = React.useState(0);
    const [lectures, setLectures] = React.useState<Lecturer[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const lecData = await getLecturers();
            setLectures(lecData);
        }
        fetchData();
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleFieldChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        changeFilter({ ...filters, key: newAlignment });
    };

    const handleAssignmentsChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value;
        changeFilter({
            ...filters,
            assignments: typeof value === 'string' ? value.split(',') : value
        });
    };

    const handleLecturerChange = (event: SelectChangeEvent) => {
        const selectedLecturer = lectures.find(lecturer => lecturer.name == event.target.value);
        changeFilter({ ...filters, lecturer: selectedLecturer || null });
    }

    const handleNextOfferChange = (year: number | null, semester: Semester | null) => {
        if (year === null || semester === null) {
            changeFilter({
                ...filters,
                nextOffer: null
            });
            return;
        }
        changeFilter({
            ...filters,
            nextOffer: { year, semester }
        });
    };

    const handleLanguageChange = (event: SelectChangeEvent) => {
        changeFilter({
            ...filters,
            language: event.target.value as Language
        });
    };


    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: 500,
                '& .MuiDrawer-paper': {
                    width: 500,
                    boxSizing: 'border-box',
                    p: 2
                },
            }}
        >
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>Filter</Typography>
                    <IconButton onClick={onClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Stack>

                <Card sx={{ p: 2 }}>
                    <CardHeader
                        title="Studiengang"
                        sx={{ textAlign: 'center' }}
                    />
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
                <Card >
                    <CardHeader title="Anrechenbarkeit" sx={{ textAlign: 'center' }} />
                    <CardContent>
                        <Select
                            value={filters.assignments || []}
                            onChange={handleAssignmentsChange}
                            fullWidth
                        >
                            {Object.values(Assignment).map((assignment) => (
                                <MenuItem
                                    key={assignment}
                                    value={assignment}
                                >
                                    {getHeaderName(assignment)?.fieldOfStudy + ": " + getHeaderName(assignment)?.assignment}
                                </MenuItem>
                            ))}
                        </Select>
                    </CardContent>
                </Card>
                <Card >
                    <CardHeader title="Dozent" sx={{ textAlign: 'center' }} />
                    <CardContent>
                        <Select
                            value={filters.lecturer?.name}
                            onChange={handleLecturerChange}
                            fullWidth
                        >
                            {lectures.map((lecturer) => (
                                <MenuItem
                                    key={lecturer.id}
                                    value={lecturer.name}
                                >
                                    {lecturer.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </CardContent>
                </Card>
                <Card >
                    <CardHeader title="Semester" sx={{ textAlign: 'center' }} />
                    <CardContent>
                        <Stack direction="row" spacing={2} >
                            <TextField
                                type="number"
                                value={filters.nextOffer?.year || ""}
                                onChange={(e) => handleNextOfferChange(parseInt(e.target.value), filters.nextOffer?.semester || currentSemester)}
                                fullWidth
                            />
                            <Select
                                value={filters.nextOffer?.semester || Semester.keineAngabe}
                                onChange={(e) => handleNextOfferChange(filters.nextOffer?.year || currentYear, e.target.value as Semester)}
                                fullWidth
                            >
                                <MenuItem value={Semester.Sommersemester}>Sommersemester</MenuItem>
                                <MenuItem value={Semester.Wintersemester}>Wintersemester</MenuItem>
                            </Select>
                        </Stack>
                        <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'center' }}>
                            <Chip
                                size="small"
                                label="Zurücksetzen"
                                onClick={() => handleNextOfferChange(null, null)}
                            />
                            <Chip
                                size="small"
                                label="Nächstes Semester"
                                onClick={() => handleNextOfferChange(nextYear, nextSemester)}
                            />
                        </Stack>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader title="Sprache" sx={{ textAlign: 'center' }} />
                    <CardContent>
                        <Select
                            value={filters.language || Language.Deutsch}
                            onChange={(e) => handleLanguageChange(e)}
                            fullWidth
                        >
                            <MenuItem value={Semester.Sommersemester}>{Language.Deutsch}</MenuItem>
                            <MenuItem value={Semester.Wintersemester}>{Language.Englisch}</MenuItem>
                        </Select>
                        <Chip
                            size="small"
                            label="Zurücksetzen"
                            onClick={() => changeFilter({ ...filters, language: null })}
                        />
                    </CardContent>
                </Card>
            </Stack>
        </Drawer>
    );
}
