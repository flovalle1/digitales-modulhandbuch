import { Card, CardContent, Grid2 as Grid, Typography } from '@mui/material';
import { Lecturer } from '@prisma/client';




export default function LecturerCard(lecturer: Lecturer) {
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Typography variant="h6">{lecturer.name}</Typography>
                    </Grid>
                    <Grid size={8}>
                        <Typography variant="body1">
                            {lecturer.courses.join(', ')}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};