"use client";
import { createCourse, updateCourse } from '@/actions/mutations';
import { getLecturers } from '@/actions/queries';
import { Box, Button, Checkbox, Chip, Container, FormControl, Grid2 as Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Assignment, Course, Lecturer } from '@prisma/client';
import { useNotifications } from '@toolpad/core';
import { useEffect, useState } from 'react';
import { getHeaderName } from '../config';

const initialCourseState: Omit<Course, "id" | "createdAt" | "updatedAt"> = {
    title: '',
    typeOfCourse: '',
    contactTimeInHours: 0,
    selfStudyTimeInHours: 0,
    workloadInHours: 0,
    teachType: '',
    ects: 0,
    code: '',
    lastOffer: '',
    nextOffer: '',
    contents: '',
    qualificationGoals: '',
    lecturer: '',
    requirements: '',
    literature: '',
    assignments: [],
    lecturerId: null
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP + 200,
            width: 350,
        },
    },
};

export interface CourseFormProps {
    courseData?: Course,
}

const CreateCourseForm = ({ courseData }: CourseFormProps) => {
    const [course, setCourse] = useState<Omit<Course, "id" | "createdAt" | "updatedAt">>(courseData ? courseData : initialCourseState);
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const notification = useNotifications();
    const isEdit = Boolean(courseData);

    useEffect(() => {
        getLecturers().then(data => setLecturers(data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Convert numeric fields to numbers
        const numericFields = ['ects', 'contactTimeInHours', 'selfStudyTimeInHours', 'workloadInHours'];
        const processedValue = numericFields.includes(name) ? Number(value) : value;

        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: processedValue
        }));
    };

    const handleAssignmentsChange = (event: SelectChangeEvent<Assignment[]>) => {
        const { value } = event.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            assignments: typeof value === 'string' ? value.split(',') as Assignment[] : value
        }));
    };

    const handleLecturerChange = (event: SelectChangeEvent<number>) => {
        setCourse(prevCourse => ({
            ...prevCourse,
            lecturerId: event.target.value as number
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let resp;
            if (isEdit && courseData) {
                resp = await updateCourse(courseData.id, course);
                notification.show(resp.title + ' wurde erfolgreich aktualisiert.', {
                    severity: "success",
                    autoHideDuration: 3000,
                });
            } else {
                resp = await createCourse(course);
                notification.show(resp.title + ' wurde erfolgreich angelegt.', {
                    severity: "success",
                    autoHideDuration: 3000,
                });
                setCourse(initialCourseState);
            }
        } catch (error) {
            notification.show('Fehler beim ' + (isEdit ? 'Aktualisieren' : 'Anlegen') + ' des Kurses:' + error, {
                severity: "error",
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            name="title"
                            label="Titel"
                            value={course.title}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            name="typeOfCourse"
                            label="Art der Vorlesung"
                            value={course.typeOfCourse}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            name="teachType"
                            label="Lehrform"
                            value={course.teachType}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            name="ects"
                            label="ECTS"
                            type="number"
                            value={course.ects}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            name="code"
                            label="Kennung"
                            value={course.code}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={4}>
                        <TextField
                            name="contactTimeInHours"
                            label="Präsenzzeit in Stunden"
                            type="number"
                            value={course.contactTimeInHours}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={4}>
                        <TextField
                            name="selfStudyTimeInHours"
                            label="Selbststudium in Stunden"
                            type="number"
                            value={course.selfStudyTimeInHours}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={4}>
                        <TextField
                            name="workloadInHours"
                            label="Gesamter Workload"
                            type="number"
                            value={course.workloadInHours}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            name="lastOffer"
                            label="Letztes Angebot (Semester)"
                            value={course.lastOffer}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            name="nextOffer"
                            label="Nächstes Angebot (Semester)"
                            value={course.nextOffer}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            minRows={4}
                            multiline
                            name="contents"
                            label="Inhalte"
                            value={course.contents}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            minRows={4}
                            multiline
                            name="qualificationGoals"
                            label="Qualifikationsziele"
                            value={course.qualificationGoals}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            multiline
                            name="literature"
                            label="Literatur"
                            value={course.literature}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={6}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="lecturer-label">Dozent</InputLabel>
                            <Select
                                labelId="lecturer-label"
                                name="lecturerId"
                                value={course.lecturerId || ''}
                                onChange={handleLecturerChange}
                                fullWidth
                            >
                                {lecturers.map((lecturer) => (
                                    <MenuItem key={lecturer.id} value={lecturer.id}>
                                        {lecturer.name /* adapt property as needed */}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            name="requirements"
                            label="Voraussetzungen"
                            value={course.requirements}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={6}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="assignment-label">Zuordnungen</InputLabel>
                            <Select
                                labelId="assignment-label"
                                name="assignments"
                                multiple
                                value={course.assignments}
                                onChange={handleAssignmentsChange}
                                input={<OutlinedInput id="assignment-label" label="Zuordnungen" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={getHeaderName(value)?.fieldOfStudy + ": " + getHeaderName(value)?.assignment} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {Object.values(Assignment).map((assignment) => (
                                    <MenuItem
                                        key={assignment}
                                        value={assignment}
                                    //style={getStyles(assignment, personassignment, theme)}
                                    >
                                        <Checkbox checked={course.assignments.includes(assignment)} />
                                        {getHeaderName(assignment)?.fieldOfStudy + ": " + getHeaderName(assignment)?.assignment}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <Button type="submit" variant="contained" color="primary">
                            {isEdit ? 'Kurs aktualisieren' : 'Kurs erstellen'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CreateCourseForm;
