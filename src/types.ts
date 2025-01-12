import { Course, Lecturer } from "@prisma/client";

export interface LecturerWithCourses extends Lecturer {
    courses: Course[];
}

export interface CourseWithLecturer extends Course {
    lecturer: Lecturer | null;
}