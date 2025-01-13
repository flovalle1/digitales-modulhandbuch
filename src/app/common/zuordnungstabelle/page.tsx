import AssignmentTable from "@/components/AssignmentTable";
import { prisma } from "@/prisma";
import { CourseWithLecturer } from "@/types";
import { GridRowsProp } from "@mui/x-data-grid";


export const dynamic = 'force-dynamic';
export default async function Home(): Promise<JSX.Element> {
  const courses: CourseWithLecturer[] = await prisma.course.findMany(
    {
      include: {
        lecturer: true,
      }
    }
  );

  const rows: GridRowsProp = courses.map((course) => {

    let assignmentMap = {};
    course.assignments.map((assignment) => {
      assignmentMap = { ...assignmentMap, [assignment]: true }
    });

    return {
      id: course.id,
      titel: course.title,
      teachtype: course.teachType,
      ects: course.ects,
      code: course.code,
      lecturer: course.lecturer?.name,
      ...assignmentMap
    };
  });

  return (
    <AssignmentTable rows={rows} />
  );
}

