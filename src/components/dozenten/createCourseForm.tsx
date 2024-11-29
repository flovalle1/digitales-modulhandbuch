import { Button, Container, Grid2 as Grid, TextField } from '@mui/material';
import { useState } from 'react';

const CreateCourseForm = () => {
    const [course, setCourse] = useState({
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
        literature: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid>
                        <TextField
                            name="title"
                            label="Title"
                            value={course.title}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="typeOfCourse"
                            label="Type of Course"
                            value={course.typeOfCourse}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="contactTimeInHours"
                            label="Contact Time in Hours"
                            type="number"
                            value={course.contactTimeInHours}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="selfStudyTimeInHours"
                            label="Self Study Time in Hours"
                            type="number"
                            value={course.selfStudyTimeInHours}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="workloadInHours"
                            label="Workload in Hours"
                            type="number"
                            value={course.workloadInHours}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="teachType"
                            label="Teach Type"
                            value={course.teachType}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="ects"
                            label="ECTS"
                            type="number"
                            value={course.ects}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="code"
                            label="Code"
                            value={course.code}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="lastOffer"
                            label="Last Offer"
                            value={course.lastOffer}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="nextOffer"
                            label="Next Offer"
                            value={course.nextOffer}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="contents"
                            label="Contents"
                            value={course.contents}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="qualificationGoals"
                            label="Qualification Goals"
                            value={course.qualificationGoals}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="lecturer"
                            label="Lecturer"
                            value={course.lecturer}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="requirements"
                            label="Requirements"
                            value={course.requirements}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            name="literature"
                            label="Literature"
                            value={course.literature}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Kurs erstellen
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CreateCourseForm;
