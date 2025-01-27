"use client";
import { createCourse, createCourseContent, deleteCourseContent, updateCourse, updateCourseContent } from '@/actions/mutations';
import { getLecturers } from '@/actions/queries';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Checkbox, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid2 as Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import { Assignment, Course, CourseContent, Language, Lecturer, Semester } from '@prisma/client';
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
    lastOfferSemester: Semester.Sommersemester,
    lastOfferYear: 2000,
    nextOfferSemester: Semester.Sommersemester,
    nextOfferYear: 2000,
    semesterPeriod: 0,
    contents: '',
    qualificationGoals: '',
    requirements: '',
    literature: '',
    assignments: [],
    lecturerId: null,
    durationInSemester: 0,
    courseLanguage: Language.Deutsch,
    typeOfExamination: ''
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
const semesterOptions = Object.values(Semester);

export interface CourseFormProps {
    courseData?: Course,
}

const CreateCourseForm = ({ courseData }: CourseFormProps) => {
    const [course, setCourse] = useState<Omit<Course, "id" | "createdAt" | "updatedAt">>(courseData ? courseData : initialCourseState);
    const [lecturers, setLecturers] = useState<Lecturer[]>([]);
    const notification = useNotifications();
    const isEdit = Boolean(courseData);
    const [courseContents, setCourseContents] = useState<CourseContent[]>([]);
    const [newContent, setNewContent] = useState<Omit<CourseContent, "id" | "createdAt" | "updatedAt" | "courseId">>({
        teachingMethod: '',
        status: '',
        creditPoints: 0,
        examType: '',
        examDurationInMinutes: 0,
        grading: '',
        gradingShareInPercent: 0,
        expectedHoursPerWeek: 0,
        title: ''
    });
    const [contentDialogOpen, setContentDialogOpen] = useState(false);

    useEffect(() => {
        getLecturers().then(data => setLecturers(data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        // Convert numeric fields to numbers
        const numericFields = ['ects', 'contactTimeInHours', 'selfStudyTimeInHours', 'workloadInHours', 'nextOfferYear', 'lastOfferYear', 'semesterPeriod', 'durationInSemester'];
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

    const handleAddContent = async () => {
        if (!courseData) return;
        const created = await createCourseContent(courseData.id, newContent);
        setCourseContents([...courseContents, created]);
        setNewContent({ teachingMethod: '', status: '', creditPoints: 0, examType: '', examDurationInMinutes: 0, grading: '', gradingShareInPercent: 0, title: "", expectedHoursPerWeek: 0 });
        setContentDialogOpen(false);
    };

    const handleUpdateContent = async (id: number, updatedData: Partial<CourseContent>) => {
        const updated = await updateCourseContent(id, updatedData);
        setCourseContents(courseContents.map((c) => (c.id === id ? updated : c)));
    };

    const handleDeleteContent = async (id: number) => {
        await deleteCourseContent(id);
        setCourseContents(courseContents.filter((c) => c.id !== id));
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
                            value={course.contactTimeInHours + course.selfStudyTimeInHours}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={4}>
                        <TextField
                            name="typeOfExamination"
                            label="Prüfungsfrom"
                            value={course.typeOfExamination}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={4}>
                        <TextField
                            name="durationInSemester"
                            label="Kursdauer in Semester"
                            type="number"
                            value={course.durationInSemester}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>Sprache</InputLabel>
                            <Select
                                name="courseLanguage"
                                value={course.courseLanguage}
                                onChange={handleChange}
                                label="Sprache"
                            >
                                {Object.values(Language).map((lang) => (
                                    <MenuItem key={lang} value={lang}>
                                        {lang}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <InputLabel>Letztes Angebot (Semester)</InputLabel>
                            <Select
                                name="lastOfferSemester"
                                value={course.lastOfferSemester}
                                onChange={handleChange}
                                label="Letztes Angebot (Semester)"
                            >
                                {semesterOptions.map((sem) => (
                                    <MenuItem key={sem} value={sem}>
                                        {sem}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={2}>
                        <TextField
                            name="lastOfferYear"
                            label="Letztes Angebot (Jahr)"
                            value={course.lastOfferYear}
                            onChange={handleChange}
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Grid size={3}>
                        <FormControl fullWidth>
                            <InputLabel>Nächstes Angebot (Semester)</InputLabel>
                            <Select
                                name="nextOfferSemester"
                                value={course.nextOfferSemester}
                                onChange={handleChange}
                                label="Nächstes Angebot (Semester)"
                            >
                                {semesterOptions.map((sem) => (
                                    <MenuItem key={sem} value={sem}>
                                        {sem}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={2}>
                        <TextField
                            name="nextOfferYear"
                            label="Nächstes Angebot (Jahr)"
                            value={course.nextOfferYear}
                            onChange={handleChange}
                            type="number"
                            fullWidth
                        />
                    </Grid>
                    <Tooltip title="In welchem Semesterrythmus wird der Kurs angeboten? 0 entspricht keinem regelmäßigen Angebot. 1 würde heißen jedes Semester. 2 jedes zweite Semester usw.">
                        <Grid size={2}>
                            <TextField
                                name="semesterPeriod"
                                label="Semesterperiode"
                                value={course.semesterPeriod}
                                onChange={handleChange}
                                type="number"
                                fullWidth
                            />
                        </Grid>
                    </Tooltip>
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
                                input={<OutlinedInput id="lecturer-label" label="Dozent" />}
                                value={course.lecturerId || ''}
                                onChange={handleLecturerChange}
                                fullWidth
                            >
                                {lecturers.map((lecturer) => (
                                    <MenuItem key={lecturer.id} value={lecturer.id}>
                                        {lecturer.name}
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
            {courseData && (
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Lehrform</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Semesterwochenstunden</TableCell>
                                <TableCell>ECTS</TableCell>
                                <TableCell>Prüfungsform</TableCell>
                                <TableCell>Prüfungsdauer</TableCell>
                                <TableCell>Benotung</TableCell>
                                <TableCell>Anteil Note</TableCell>
                                <TableCell>Aktionen</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courseContents.map((content) => (
                                <TableRow key={content.id}>
                                    <TableCell>{content.title}</TableCell>
                                    <TableCell>{content.teachingMethod}</TableCell>
                                    <TableCell>{content.status}</TableCell>
                                    <TableCell>{content.expectedHoursPerWeek}</TableCell>
                                    <TableCell>{content.creditPoints}</TableCell>
                                    <TableCell>{content.examType}</TableCell>
                                    <TableCell>{content.examDurationInMinutes}</TableCell>
                                    <TableCell>{content.grading}</TableCell>
                                    <TableCell>{content.gradingShareInPercent}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleUpdateContent(content.id, { ...content, status: 'Updated' })}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteContent(content.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button variant="contained" onClick={() => setContentDialogOpen(true)}>Add Course Content</Button>
                    <Dialog open={contentDialogOpen} onClose={() => setContentDialogOpen(false)} maxWidth="sm" fullWidth>
                        <DialogTitle>Add Course Content</DialogTitle>
                        <DialogContent>
                            <Box mt={2}>
                                <TextField
                                    label="Name"
                                    value={newContent.teachingMethod}
                                    onChange={(e) => setNewContent({ ...newContent, teachingMethod: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="Lehrform"
                                    value={newContent.teachingMethod}
                                    onChange={(e) => setNewContent({ ...newContent, teachingMethod: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="Status"
                                    value={newContent.status}
                                    onChange={(e) => setNewContent({ ...newContent, status: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="Credit Points"
                                    type="number"
                                    value={newContent.creditPoints}
                                    onChange={(e) => setNewContent({ ...newContent, creditPoints: Number(e.target.value) })}
                                    fullWidth
                                />
                                <TextField
                                    label="Exam Type"
                                    value={newContent.examType}
                                    onChange={(e) => setNewContent({ ...newContent, examType: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="Exam Duration"
                                    type="number"
                                    value={newContent.examDurationInMinutes}
                                    onChange={(e) => setNewContent({ ...newContent, examDurationInMinutes: Number(e.target.value) })}
                                    fullWidth
                                />
                                <TextField
                                    label="Grading"
                                    value={newContent.grading}
                                    onChange={(e) => setNewContent({ ...newContent, grading: e.target.value })}
                                    fullWidth
                                />
                                <TextField
                                    label="Module Grading"
                                    type="number"
                                    value={newContent.gradingShareInPercent}
                                    onChange={(e) => setNewContent({ ...newContent, gradingShareInPercent: Number(e.target.value) })}
                                    fullWidth
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setContentDialogOpen(false)} color="secondary">Abbrechen</Button>
                            <Button onClick={handleAddContent} variant="contained" color="primary">Hinzufügen</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </Container>
    );
};

export default CreateCourseForm;
