import CourseDetails from '@/components/common/CourseDetails';
import { prisma } from '@/prisma';
import { Stack } from '@mui/material';



export const dynamic = 'force-dynamic'

export default async function Veranstaltungsverzeichnisse() {
    const rows = await prisma.course.findMany(
        {
            include: {
                lecturer: true,
                courseContent: true
            }
        }
    );
    return (
        <Stack spacing={5} sx={{ mx: 12, mt: 8 }}>
            {rows.map((row) => (
                <CourseDetails key={row.id} course={row} />
            ))}
        </Stack>
    );
}
