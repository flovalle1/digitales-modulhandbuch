"use server";

import { prisma } from "@/prisma";
import { saltAndHashPassword } from "@/utils/auth/saltAndHashPassword";
import { Course, CourseContent, Lecturer } from "@prisma/client";
import { User } from "next-auth";

export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
};


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

export async function createCourseContent(courseId: number, contentData: Omit<CourseContent, "id" | "createdAt" | "updatedAt" | "courseId">): Promise<CourseContent> {
    const resp = await prisma.courseContent.create({
        data: {
            ...contentData,
            courseId
        }
    });
    return resp;
}

export async function updateCourseContent(id: number, contentData: Partial<Omit<CourseContent, "id" | "createdAt" | "updatedAt" | "courseId">>): Promise<CourseContent> {
    const resp = await prisma.courseContent.update({
        where: {
            id
        },
        data: contentData
    });
    return resp;
}

export async function deleteCourseContent(id: number): Promise<CourseContent> {
    const resp = await prisma.courseContent.delete({
        where: {
            id
        }
    });
    return resp;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function createUser(user: CreateUserInput): Promise<Omit<User, "passwordHash">> {
    const passwordHash = await saltAndHashPassword(user.password);
    const { password, ...userData } = user;

    const resp = await prisma.user.create({
        data: { passwordHash, ...userData }
    });

    const { passwordHash: _, ...userWithoutPasswordHash } = resp;
    return userWithoutPasswordHash;
}
/* eslint-enable @typescript-eslint/no-unused-vars */
