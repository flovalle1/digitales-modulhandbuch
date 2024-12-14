"use server";

import { prisma } from "@/prisma";
import { Course } from "@prisma/client";

export async function createCourse(courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> {
    const resp = await prisma.course.create({
        data: courseData
    });
    return resp;
}
