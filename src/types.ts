import { Course, Lecturer } from "@prisma/client";

export interface LecturerWithCourses extends Lecturer {
    courses: Course[];
}