import CreateLecturerForm from "@/components/dashboard/createLecturerForm";
import { prisma } from "@/prisma";

export interface PageProps {
    params: Promise<{ lecturerId: string }>;
}

export default async function Page({ params }: PageProps) {
    const { lecturerId } = await params;
    const lecturer = await prisma.lecturer.findUnique({
        where: {
            id: Number(lecturerId)
        }
    }) || undefined;

    return (
        <>
            <CreateLecturerForm lecturerData={lecturer} />
        </>
    );
}
