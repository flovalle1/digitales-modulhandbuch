import { auth } from "@/auth";
import CreateCourseForm from "@/components/dashboard/createCourseForm";
import { prisma } from "@/prisma";
import { UserRole } from "@prisma/client";

export interface PageProps {
    params: Promise<{ courseId: string }>;
}

export default async function Page({ params }: PageProps) {
    const [{ courseId }, session] = await Promise.all([params, auth()]);
    // @ts-expect-error
    const [userRole, lecturerId] = [session?.user?.role, session?.user?.lecturerId]

    const course = await prisma.course.findUnique({
        where: {
            id: Number(courseId)
        }
    }) || undefined;

    if (userRole != UserRole.ADMIN && course?.lecturerId != lecturerId) {
        return <div>Du bist nicht berechtigt auf diesen Kurs zuzugreifen.</div>
    }

    return (
        <>
            <CreateCourseForm courseData={course} />
        </>
    );
}