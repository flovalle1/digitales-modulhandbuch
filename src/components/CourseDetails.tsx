import { stringifyLastOffer, stringifyNextOffer } from '@/lib/semester';
import { CourseWithLecturer } from '@/types';
import { Card, CardContent, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";

type CourseDetailsProps = {
    course: CourseWithLecturer;
};

export default function CourseDetails({ course }: CourseDetailsProps) {
    return (
        <Card id={course.id.toString()}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {course.title}
                </Typography>
                <Typography color="textSecondary">
                    {course.code}
                </Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell >
                                <Typography variant="body1">Arbeitsaufwand</Typography>
                                <p>{course.workloadInHours} Stunden</p>
                            </TableCell>
                            <TableCell >
                                <Typography variant="body1">Kontaktzeit</Typography>
                                <p>{course.contactTimeInHours} Stunden</p>
                            </TableCell>
                            <TableCell >
                                <Typography variant="body1">Selbststudium</Typography>
                                <p>{course.selfStudyTimeInHours} Stunden</p>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>ECTS</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.ects}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Veranstaltungsdauer</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.durationInSemester} Semester</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Häufigkeit des Angebots</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>
                                {course.semesterPeriod === 0 ? 'Unregelmäßig' : course.semesterPeriod === 1 ? 'Jedes Semester' : `Jedes ${course.semesterPeriod}. Semester`}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Unterrichtssprache</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.courseLanguage}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Prüfungsform</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.typeOfExamination}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Inhalt</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.contents}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Qualifikationsziele</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.qualificationGoals}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Teilnahmevoraussetzungen</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.requirements}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Dozent/in</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.lecturer?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Literatur</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{course.literature}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Zuletzt Angeboten</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{stringifyLastOffer(course)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Geplant für</TableCell>
                            <TableCell sx={{ minWidth: 1000 }} colSpan={2}>{stringifyNextOffer(course)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card >
    );
}