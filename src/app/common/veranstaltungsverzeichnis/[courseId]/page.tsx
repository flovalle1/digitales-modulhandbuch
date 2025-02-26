import CourseDetails from '@/components/common/CourseDetails';
import { prisma } from '@/prisma';
import { Stack } from '@mui/material';

export const dynamic = 'force-dynamic';

export interface PageProps {
    params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
    const { courseId } = await params;
    const row = await prisma.course.findFirst({
        where: {
            id: Number(courseId),
        },
        include: {
            lecturer: true,
            courseContent: true,
        },
    });
    return (
        <Stack spacing={5} sx={{ mx: 12, mt: 8 }}>
            {row && <CourseDetails key={row.id} course={row} />}
        </Stack>
    );
}