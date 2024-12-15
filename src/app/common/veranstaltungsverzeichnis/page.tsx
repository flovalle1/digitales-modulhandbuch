import CourseDetails from '@/components/CourseDetails';
import { prisma } from '@/prisma';
import { Stack } from '@mui/material';


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
