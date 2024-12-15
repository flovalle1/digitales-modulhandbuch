import CourseDetails from '@/components/CourseDetails';
import { prisma } from '@/prisma';
import { Stack } from '@mui/material';
import { Course } from '@prisma/client';


const rows_moch: Course[] = [
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
        lastOffer: "Sommersemster 2022",
        nextOffer: "Wintersemester 2022/23",
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
        lastOffer: "Sommersemster 2021",
        nextOffer: "Wintersemester 2022/23",
        contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        qualificationGoals: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        lecturer: "Dr. Jane Smith",
        requirements: "Introduction to Programming",
        literature: "Data Structures by Jane Smith",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const rows = await prisma.course.findMany();

export const dynamic = 'force-dynamic'
export default function Veranstaltungsverzeichnisse() {
    return (

        <Stack spacing={5} sx={{ mx: 12, mt: 8 }}>
            {rows.map((row) => (
                <CourseDetails key={row.id} course={row} />
            ))}
        </Stack>
    );
}
