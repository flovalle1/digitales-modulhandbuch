import CourseOverwiev from '@/components/dashboard/CourseOverview';
import { prisma } from '@/prisma';

export const dynamic = 'force-dynamic';

export default async function DashboardLayoutBasic() {
    const allCourses = await prisma.course.findMany(
        {
            include: {
                lecturer: true,
            }
        }
    );

    return (
        <CourseOverwiev courses={allCourses} />
    );
}
