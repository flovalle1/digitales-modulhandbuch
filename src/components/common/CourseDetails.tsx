import { stringifyLastOffer, stringifyNextOffer } from '@/lib/semester';
import { CourseWithLecturerCourseContent } from '@/types';
import { Box, Card, CardContent, Chip, Grid2 as Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { getHeaderName } from '../config';
import AlterTableRow from '../stylings/AlterTableRow';

type CourseDetailsProps = {
    course: CourseWithLecturerCourseContent;
};

export default function CourseDetails({ course }: CourseDetailsProps) {
    return (
        <Card id={course.id.toString()}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="h5" component="div">
                            {course.title}
                        </Typography>
                        <Typography color="textSecondary">
                            {course.code}
                        </Typography>
                    </Grid>
                    <Grid size={6}>
                        {course.assignments.map((assignment) => (
                            <Tooltip title={getHeaderName(assignment)?.fieldOfStudy} key={assignment}>
                                <Chip variant='outlined' label={getHeaderName(assignment)?.assignment} sx={{ mx: 0.2, my: 0.2 }} />
                            </Tooltip>
                        ))}
                    </Grid>
                </Grid>
                <Grid sx={{ my: 3 }} container spacing={2} >
                    <Grid size={4} >
                        <Typography variant="h6" align="center">Arbeitsaufwand</Typography>
                        <Typography align="center">{course.workloadInHours} Stunden</Typography>
                    </Grid>
                    <Grid size={4}>
                        <Typography align="center" variant="h6">Kontaktzeit</Typography>
                        <Typography align="center">{course.contactTimeInHours} Stunden</Typography>
                    </Grid>
                    <Grid size={4}>
                        <Typography align="center" variant="h6">Selbststudium</Typography>
                        <Typography align="center">{course.selfStudyTimeInHours} Stunden</Typography>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table >
                        <TableBody>
                            <AlterTableRow>
                                <TableCell><b>ECTS</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.ects}</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Veranstaltungsdauer</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.durationInSemester} Semester</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Häufigkeit des Angebots</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>
                                    {course.semesterPeriod === 0 ? 'Unregelmäßig' : course.semesterPeriod === 1 ? 'Jedes Semester' : `Jedes ${course.semesterPeriod}. Semester`}
                                </TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Unterrichtssprache</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.courseLanguage}</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Prüfungsform</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.typeOfExamination}</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Prüfungsform</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.teachType}</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Inhalt</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.contents}</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Qualifikationsziele</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.qualificationGoals}</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Lehrinhalte</b></TableCell>
                                <TableCell>
                                    <Box sx={{ m: 1 }} >
                                        <TableContainer component={Card}>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow >
                                                        <TableCell><b>Lehrform</b></TableCell>
                                                        <TableCell><b>Status</b></TableCell>
                                                        <TableCell><b>SWS</b></TableCell>
                                                        <TableCell><b>CP</b></TableCell>
                                                        <TableCell><b>Prüfungsform</b></TableCell>
                                                        <TableCell><b>Prüfungsdauer</b></TableCell>
                                                        <TableCell><b>Benotung</b></TableCell>
                                                        <TableCell><b>Anteil</b></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {course.courseContent.map((content) => (
                                                        <AlterTableRow id={content.id.toString()} key={content.id}>
                                                            <TableCell>{content.title}</TableCell>
                                                            <TableCell>{content.status}</TableCell>
                                                            <TableCell>{content.expectedHoursPerWeek}</TableCell>
                                                            <TableCell>{content.creditPoints}</TableCell>
                                                            <TableCell>{content.examType}</TableCell>
                                                            <TableCell>{content.examDurationInMinutes}</TableCell>
                                                            <TableCell>{content.grading}</TableCell>
                                                            <TableCell>{content.gradingShareInPercent}</TableCell>
                                                        </AlterTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Teilnahmevoraussetzungen</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.requirements}</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Dozent/in</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.lecturer?.name}</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Literatur</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.literature}</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Zuletzt Angeboten</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{stringifyLastOffer(course)}</TableCell>
                            </AlterTableRow>
                            <AlterTableRow>
                                <TableCell><b>Geplant für</b></TableCell>
                                <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{stringifyNextOffer(course)}</TableCell>
                            </AlterTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card >
    );
}