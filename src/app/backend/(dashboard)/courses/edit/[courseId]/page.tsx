import CreateCourseForm from "@/components/dashboard/createCourseForm";
import { prisma } from "@/prisma";

export interface PageProps {
    params: Promise<{ courseId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { courseId } = await params;
    const course = await prisma.course.findUnique({
        where: {
            id: Number(courseId)
        }
    }) || undefined;

    return (
        <>
            <CreateCourseForm courseData={course} />
        </>
    );
}