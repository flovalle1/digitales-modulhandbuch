import { Card, CardContent, Grid2 as Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Lecturer } from '@prisma/client';




export default function LecturerCard(lecturer: Lecturer) {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Typography variant="h5">{lecturer.name}</Typography>
                    </Grid>
                    <Grid size={8}>
                        <List>
                            {lecturer.courses.map((course) => (
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemText primary={course} secondary="CS101 · 6 ECTS · Sommersemester 2023" />
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