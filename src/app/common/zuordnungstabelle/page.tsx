import AssignmentTable from "@/components/AssignmentTable";
import { prisma } from "@/prisma";
import { GridRowsProp } from "@mui/x-data-grid";
import { Course } from "@prisma/client";


export const dynamic = 'force-dynamic';
export default async function Home(): Promise<JSX.Element> {
  const courses: Course[] = await prisma.course.findMany();

  const rows: GridRowsProp = courses.map((course) => {
    return {
      id: course.id,
      titel: course.title,
      teachtype: course.teachType,
      ects: course.ects,
      code: course.code,
      lecturer: course.lecturer,
      mandatory: true
    };
  });

  return (
    <AssignmentTable rows={rows} />
  );
}

