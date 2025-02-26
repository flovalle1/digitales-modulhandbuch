import { auth } from '@/auth';
import CourseOverwiev from '@/components/dashboard/CourseOverview';
import LecturerOverview from '@/components/dashboard/LecturerOverview';
import UserOverview from '@/components/dashboard/UserOverview';
import { prisma } from '@/prisma';
import { Grid2 as Grid } from '@mui/material';

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
    //@ts-expect-error: session type istn changeable in the dependency
    const userRole = session?.user?.role;

    let query: FindManyQuery = {
        include: {
            lecturer: true,
        },
    }

    //@ts-expect-error: session type istn changeable in the dependency
    if (userRole == 'LECTURER') query = { ...query, where: { lecturerId: session.user.lecturerId } }

    const allCourses = await prisma.course.findMany(query);

    if (userRole == 'LECTURER')
        return (
            <CourseOverwiev courses={allCourses} />
        );


    const allLecturers = await prisma.lecturer.findMany();
    const allUsers = await prisma.user.findMany(
        {
            include: {
                lecturer: true
            }
        }
    );

    return (
        <Grid container spacing={2}>

            <Grid size={12}>
                <CourseOverwiev courses={allCourses} />
            </Grid>

            <Grid size={12}>
                <LecturerOverview lecturers={allLecturers} />
            </Grid>

            <Grid size={12}>
                <UserOverview users={allUsers} />
            </Grid>
        </Grid>
    )
}
