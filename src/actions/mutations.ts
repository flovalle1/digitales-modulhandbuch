"use server";

import { prisma } from "@/prisma";
import { Course } from "@prisma/client";

export async function createCourse(courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> {
    const resp = await prisma.course.create({
        data: courseData
    });
    return resp;
}

export async function updateCourse(id: number, courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> {
    const resp = await prisma.course.update({
        where: {
            id
        },
        data: courseData
    });
    return resp;
}

export async function deleteCourse(id: number): Promise<Course> {
    const resp = await prisma.course.delete({
        where: {
            id
        }
    });
    return resp;
}
