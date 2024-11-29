"use client";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Course } from '@prisma/client';
import * as React from 'react';
import CourseDetails from './CourseDetails';

const rows: Course[] = [
    {
        id: 1,
        title: "Introduction to Programming",
        typeOfCourse: "Lecture",
        contactTimeInHours: 30,
        selfStudyTimeInHours: 60,
        workloadInHours: 90,
        teachType: "In-person",
        ects: 3,
        code: "CS101",
        lastOffer: "2022-09-01",
        nextOffer: "2023-09-01",
        contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        qualificationGoals: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        lecturer: "Dr. John Doe",
        requirements: "None",
        literature: "Introduction to Programming by John Doe",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        title: "Data Structures",
        typeOfCourse: "Lecture",
        contactTimeInHours: 40,
        selfStudyTimeInHours: 80,
        workloadInHours: 120,
        teachType: "In-person",
        ects: 4,
        code: "CS102",
        lastOffer: "2022-09-01",
        nextOffer: "2023-09-01",
        contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        qualificationGoals: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        lecturer: "Dr. Jane Smith",
        requirements: "Introduction to Programming",
        literature: "Data Structures by Jane Smith",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

function Row(props: { row: Course }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="right">{row.code}</TableCell>
                <TableCell align="right">{row.ects}</TableCell>
                <TableCell align="right">{row.typeOfCourse}</TableCell>
                <TableCell align="right">{row.nextOffer}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <CourseDetails course={row} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead >
                    <TableRow>
                        <TableCell />
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Nummer</TableCell>
                        <TableCell align="right">ECTS</TableCell>
                        <TableCell align="right">Kursart</TableCell>
                        <TableCell align="right">Geplant für</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
