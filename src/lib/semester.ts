
import { Course } from "@prisma/client";

export function stringifyLastOffer(course: Course): string {
    return `${course.lastOfferSemester} ${course.lastOfferYear}`;
}

export function stringifyNextOffer(course: Course): string {
    return `${course.nextOfferSemester} ${course.nextOfferYear}`;
}

