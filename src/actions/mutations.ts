"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { saltAndHashPassword } from "@/utils/auth/saltAndHashPassword";
import { Course, CourseContent, Lecturer, UserRole } from "@prisma/client";
import { User } from "next-auth";

export type CreateUserInput = {
    name: string;
    email: string;
    password: string;
};

async function checkAdmin() {
    const session = await auth();
    // @ts-expect-error: session type istn changeable in the dependency
    if (session?.user?.role == UserRole.ADMIN) {
        return true;
    }
    return false;
}

async function checkLecturerAccess(courseId: number) {
    const session = await auth();
    // @ts-expect-error: session type istn changeable in the dependency
    if (session?.user?.role == UserRole.ADMIN) return true;

    const checkCourse: Course | null = await prisma.course.findUnique({
        where: {
            id: courseId
        },
    });
    // @ts-expect-error: session type istn changeable in the dependency
    if (checkCourse?.lecturerId == session?.user?.lecturerId && session?.user?.role == UserRole.LECTURER) return true;
    return false;
}

export async function createCourse(courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> {
    if (!await checkAdmin()) throw new Error("Not authorized");
    const resp = await prisma.course.create({
        data: courseData
    });
    return resp;
}

export async function updateCourse(id: number, courseData: Omit<Course, "id" | "createdAt" | "updatedAt">): Promise<Course> {
    if (!await checkLecturerAccess(id)) throw new Error("Not authorized");
    const resp = await prisma.course.update({
        where: {
            id
        },
        data: courseData
    });
    return resp;
}

export async function deleteCourse(id: number): Promise<Course> {
    if (!await checkAdmin()) throw new Error("Not authorized");
    const resp = await prisma.course.delete({
        where: {
            id
        }
    });
    return resp;
}

export async function createLecturer(lecturerData: Omit<Lecturer, "id" | "createdAt" | "updatedAt">): Promise<Lecturer> {
    if (!await checkAdmin()) throw new Error("Not authorized");
    const resp = await prisma.lecturer.create({
        data: lecturerData
    });
    return resp;
}

export async function updateLecturer(id: number, lecturerData: Omit<Lecturer, "id" | "createdAt" | "updatedAt" | "courses">): Promise<Lecturer> {
    if (!await checkAdmin()) throw new Error("Not authorized");
    const resp = await prisma.lecturer.update({
        where: {
            id
        },
        data: lecturerData
    });
    return resp;
}

export async function deleteLecturer(id: number): Promise<Lecturer> {
    if (!await checkAdmin()) throw new Error("Not authorized");
    const resp = await prisma.lecturer.delete({
        where: {
            id
        }
    });
    return resp;
}

export async function createCourseContent(courseId: number, contentData: Omit<CourseContent, "id" | "createdAt" | "updatedAt" | "courseId">): Promise<CourseContent> {
    if (!await checkLecturerAccess(courseId)) throw new Error("Not authorized");
    const resp = await prisma.courseContent.create({
        data: {
            ...contentData,
            courseId
        }
    });
    return resp;
}

export async function updateCourseContent(courseId: number, contentData: Partial<Omit<CourseContent, "id" | "createdAt" | "updatedAt" | "courseId">>): Promise<CourseContent> {
    if (!await checkLecturerAccess(courseId)) throw new Error("Not authorized");
    const resp = await prisma.courseContent.update({
        where: {
            id: courseId
        },
        data: contentData
    });
    return resp;
}

export async function deleteCourseContent(courseId: number): Promise<CourseContent> {
    if (!await checkLecturerAccess(courseId)) throw new Error("Not authorized");
    const resp = await prisma.courseContent.delete({
        where: {
            id: courseId
        }
    });
    return resp;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function createUser(user: CreateUserInput): Promise<Omit<User, "passwordHash">> {
    if (!await checkAdmin()) throw new Error("Not authorized");
    const passwordHash = await saltAndHashPassword(user.password);
    const { password, ...userData } = user;

    const resp = await prisma.user.create({
        data: { passwordHash, ...userData }
    });

    const { passwordHash: _, ...userWithoutPasswordHash } = resp;
    return userWithoutPasswordHash;
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export async function deleteUser(id: string): Promise<User> {
    if (!await checkAdmin()) throw new Error("Not authorized");
    const resp = await prisma.user.delete({
        where: {
            id
        }
    });
    return resp;
}
