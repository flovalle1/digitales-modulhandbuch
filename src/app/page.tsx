import AssignmentTable from "@/components/AssignmentTable";
import { prisma } from "@/prisma";
import { GridRowsProp } from "@mui/x-data-grid";


export default async function Home(): Promise<JSX.Element> {

  const courses = await prisma.course.findMany();

  const rows: GridRowsProp = courses.map((course) => {
    return {
      id: course.id,
      titel: course.title,
      teachtype: course.teachType,
      ects: course.ects,
      code: course.code,
      lecturer: course.lecturer,
    };
  });

  console.log(rows);

  return (
    <AssignmentTable rows={rows} />
  );
}

