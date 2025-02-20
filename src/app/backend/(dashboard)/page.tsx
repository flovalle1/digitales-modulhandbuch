import { auth } from '@/auth';
import CourseOverwiev from '@/components/dashboard/CourseOverview';
import { prisma } from '@/prisma';

export const dynamic = 'force-dynamic';

type FindManyQuery = {
    include: {
        lecturer: boolean;
    };
    where?: {
        lecturerId: number;
    }
}

export default async function DashboardLayoutBasic() {
    const session = await auth();

    let query: FindManyQuery = {
        include: {
            lecturer: true,
        },
    }

    //@ts-expect-error
    if (session?.user?.role == 'LECTURER') query = { ...query, where: { lecturerId: session.user.lecturerId } }

    const allCourses = await prisma.course.findMany(query);

    return (
        <CourseOverwiev courses={allCourses} />
    );
}
