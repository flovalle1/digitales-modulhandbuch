import { Card, CardContent, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { Course } from "@prisma/client";

type CourseDetailsProps = {
    course: Course;
};

export default function CourseDetails({ course }: CourseDetailsProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {course.title}
                </Typography>
                <Typography color="textSecondary">
                    {course.code}
                </Typography>
                <Table>
                    <TableRow>
                        <TableCell >
                            <Typography variant="body1">Arbeitsauffwand</Typography>
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
                </Table>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>ECTS</TableCell>
                            <TableCell colSpan={2}>{course.ects}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Veranstaltungsdauer</TableCell>
                            <TableCell colSpan={2}>1 Semester</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Häufigkeit des Angebots</TableCell>
                            <TableCell colSpan={2}>Jährlich / Wintersemester</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Prüfungsform</TableCell>
                            <TableCell colSpan={2}>Klausur</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Inhalt</TableCell>
                            <TableCell colSpan={2}>{course.contents}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Qualifikationsziele</TableCell>
                            <TableCell colSpan={2}>{course.qualificationGoals}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Teilnahmevoraussetzungen</TableCell>
                            <TableCell colSpan={2}>{course.requirements}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Dozent/in</TableCell>
                            <TableCell colSpan={2}>{course.lecturer}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Literatur</TableCell>
                            <TableCell colSpan={2}>{course.literature}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Zuletzt Angeboten</TableCell>
                            <TableCell colSpan={2}>{course.lastOffer}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Geplant für</TableCell>
                            <TableCell colSpan={2}>{course.nextOffer}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}