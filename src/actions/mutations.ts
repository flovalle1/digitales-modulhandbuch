"use server";

import { prisma } from "@/prisma";
import { Course, Lecturer } from "@prisma/client";

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

export async function createLecturer(lecturerData: Omit<Lecturer, "id" | "createdAt" | "updatedAt">): Promise<Lecturer> {
    const resp = await prisma.lecturer.create({
        data: lecturerData
    });
    return resp;
}

export async function updateLecturer(id: number, lecturerData: Omit<Lecturer, "id" | "createdAt" | "updatedAt" | "courses">): Promise<Lecturer> {
    const resp = await prisma.lecturer.update({
        where: {
            id
        },
        data: lecturerData
    });
    return resp;
}

export async function deleteLecturer(id: number): Promise<Lecturer> {
    const resp = await prisma.lecturer.delete({
        where: {
            id
        }
    });
    return resp;
}
