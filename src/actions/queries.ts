"use server";

import { prisma } from "@/prisma";
import { CourseWithLecturer } from "@/types";
import { CourseContent, Lecturer } from "@prisma/client";

export async function getCourses(): Promise<CourseWithLecturer[]> {
    const resp = await prisma.course.findMany(
        {
            include: {
                lecturer: true,
            }
        }
    );
    return resp;
}

export async function getLecturers(): Promise<Lecturer[]> {
    const resp = await prisma.lecturer.findMany();
    return resp;
}

export async function getCourseContents(courseId: number): Promise<CourseContent[]> {
    const resp = await prisma.courseContent.findMany(
        {
            where: {
                courseId: courseId
            }
        }
    );
    return resp;
}