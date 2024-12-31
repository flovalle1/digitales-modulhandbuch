"use client";
import { paths } from '@/paths';
import { Card, CardContent, Grid2 as Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Course, Lecturer } from '@prisma/client';
import { useRouter } from 'next/router';




export default function LecturerCard(lecturer: Lecturer, courses: Course[]) {
    const router = useRouter();
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Typography variant="h5">{lecturer.name}</Typography>
                    </Grid>
                    <Grid size={8}>
                        <List>
                            {courses.map((course) => (
                                <ListItem key={course.id} disablePadding>
                                    <ListItemButton onClick={() => { router.push(paths.course(course.id.toString())) }}>
                                        <ListItemText primary={course.title} secondary={`${course.code} · ${course.ects} ECTS · ${course.nextOffer}`} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};