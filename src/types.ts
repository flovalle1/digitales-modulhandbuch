import { Course, CourseContent, Lecturer, User } from "@prisma/client";

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

export interface UserWithLecturer extends User {
    lecturer: Lecturer | null;
}