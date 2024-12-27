"use server";

import { prisma } from "@/prisma";
import { Course } from "@prisma/client";

export async function getCourses(): Promise<Course[]> {
    const resp = await prisma.course.findMany();
    return resp;
}
