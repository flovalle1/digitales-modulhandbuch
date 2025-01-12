import { getCurrentSemester, increaseSemester } from '@/lib/semester';
import { prisma } from '@/prisma';
import { Course } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const validApiKey = process.env.CRONJOB_API_KEY;
    const providedKey = request.headers.get('API-KEY');

    if (!validApiKey || providedKey !== validApiKey) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const courses: Course[] = await prisma.course.findMany();
        const { semester: currentSemester, year: currentYear } = getCurrentSemester();

        const updates = courses.map(async (course) => {
            if (course.nextOfferYear <= currentYear && course.nextOfferSemester === currentSemester) {
                const { semester, year } = increaseSemester(course.nextOfferSemester, course.nextOfferYear, course.semesterPeriod);
                prisma.course.update({
                    where: {
                        id: course.id
                    },
                    data: {
                        lastOfferYear: course.nextOfferYear,
                        lastOfferSemester: course.nextOfferSemester,
                        nextOfferYear: year,
                        nextOfferSemester: semester
                    }
                });
            }
        });
        await Promise.all(updates);
        return NextResponse.json({ message: 'Semester updated successfully.' }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
