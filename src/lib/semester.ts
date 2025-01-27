
import { Course, Semester } from "@prisma/client";

export function stringifyLastOffer(course: Course): string {
    if (course.lastOfferSemester === null || course.lastOfferSemester === Semester.keineAngabe) return "Keine Angabe";
    return `${course.lastOfferSemester} ${course.lastOfferYear}`;
}

export function stringifyNextOffer(course: Course): string {
    if (course.nextOfferSemester === null || course.nextOfferSemester === Semester.keineAngabe) return "Keine Angabe";
    return `${course.nextOfferSemester} ${course.nextOfferYear}`;
}

export function increaseSemester(semester: Semester, year: number, amount: number = 1) {
    for (let i = 0; i < amount; i++) {
        if (semester === Semester.Sommersemester) {
            semester = Semester.Wintersemester;
            year++;
        } else {
            semester = Semester.Sommersemester;
        }
    }
    return { semester, year };
}

export function getCurrentSemester(): { semester: Semester; year: number } {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    if (month > 3 && month <= 9) {
        return { semester: Semester.Sommersemester, year };
    } else {
        return { semester: Semester.Wintersemester, year };
    }
}