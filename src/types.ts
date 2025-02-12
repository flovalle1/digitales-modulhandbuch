import { Course, CourseContent, Lecturer } from "@prisma/client";

export interface LecturerWithCourses extends Lecturer {
    courses: Course[];
}

export interface CourseWithLecturer extends Course {
    lecturer: Lecturer | null;
}

export interface CourseWithLecturerCourseContent extends Course {
    lecturer: Lecturer | null;
    courseContent: CourseContent[];
}