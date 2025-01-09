"use server";

import { prisma } from "@/prisma";
import { Course, Lecturer } from "@prisma/client";

export async function getCourses(): Promise<Course[]> {
    const resp = await prisma.course.findMany();
    return resp;
}

export async function getLecturers(): Promise<Lecturer[]> {
    const resp = await prisma.lecturer.findMany();
    return resp;
}