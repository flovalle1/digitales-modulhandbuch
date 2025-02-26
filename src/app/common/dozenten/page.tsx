import LecturerCard from '@/components/common/LecturerCard';
import { prisma } from '@/prisma';
import { LecturerWithCourses } from '@/types';
import { Stack } from '@mui/material';

export const dynamic = 'force-dynamic';


export default async function Veranstaltungsverzeichnisse() {
    const lecturers: LecturerWithCourses[] = await prisma.lecturer.findMany({
        include: {
            courses: true
        },
    },
    );


    return (
        <Stack spacing={5} sx={{ mx: 12, mt: 8 }}>
            {lecturers.map((lecturer) => (
                <LecturerCard key={lecturer.id} lecturerWithCourses={lecturer} />
            ))}
        </Stack>
    );
}