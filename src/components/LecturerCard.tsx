"use client";
import { stringifyNextOffer } from '@/lib/semester';
import { paths } from '@/paths';
import { LecturerWithCourses } from '@/types';
import { Card, CardContent, Grid2 as Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export interface LecturerCardProps {
    lecturerWithCourses: LecturerWithCourses
}

export default function LecturerCard({ lecturerWithCourses }: LecturerCardProps) {
    const { courses, ...lecturer } = lecturerWithCourses;
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
                                        <ListItemText primary={course.title} secondary={`${course.code} · ${course.ects} ECTS · ${stringifyNextOffer(course)}`} />
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