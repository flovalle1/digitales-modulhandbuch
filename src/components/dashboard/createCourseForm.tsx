"use client";
import { createCourse, updateCourse } from '@/actions/mutations';
import { Button, Container, Grid2 as Grid, TextField } from '@mui/material';
import { Course } from '@prisma/client';
import { useNotifications } from '@toolpad/core';
import { useState } from 'react';

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
    assignments: []
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export interface CourseFormProps {
    courseData?: Course,
}

const CreateCourseForm = ({ courseData }: CourseFormProps) => {
    const [course, setCourse] = useState<Omit<Course, "id" | "createdAt" | "updatedAt">>(courseData ? courseData : initialCourseState);
    const notification = useNotifications();
    const isEdit = Boolean(courseData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Convert numeric fields to numbers
        const numericFields = ['ects', 'contactTimeInHours', 'selfStudyTimeInHours', 'workloadInHours'];
        const processedValue = numericFields.includes(name) ? Number(value) : value;

        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: processedValue
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
                        <TextField
                            name="lecturer"
                            label="Dozent"
                            value={course.lecturer}
                            onChange={handleChange}
                            fullWidth
                        />
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
