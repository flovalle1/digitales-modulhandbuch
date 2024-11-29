import { Chip, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Course } from "@prisma/client";

type CourseDetailsProps = {
    course: Course;
};

export default function CourseDetails({ course }: CourseDetailsProps) {

    return (
        <Table size="small" aria-label="purchases">
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Chip color="primary" variant="outlined" label={course.code} />
                    </TableCell>
                    <TableCell width={400}>
                        <Typography variant="h6" color="textPrimary">{course.title}</Typography>
                    </TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow key={course.code}>
                    <TableCell component="th" scope="row">
                        Test
                    </TableCell>
                    <TableCell>Test</TableCell>
                    <TableCell align="right">test</TableCell>
                    <TableCell align="right">
                        Test
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}