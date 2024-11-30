import AssignmentTable from "@/components/AssignmentTable";
import { GridRowsProp } from "@mui/x-data-grid";
import { Course } from "@prisma/client";


export default async function Home(): Promise<JSX.Element> {

  //const courses: Course[] = await prisma.course.findMany();

  const courses: Course[] = [
    {
      id: 1,
      title: "Introduction to Programming",
      typeOfCourse: "Lecture",
      contactTimeInHours: 30,
      selfStudyTimeInHours: 60,
      workloadInHours: 90,
      teachType: "In-person",
      ects: 3,
      code: "CS101",
      lastOffer: "2022-09-01",
      nextOffer: "2023-09-01",
      contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      qualificationGoals: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      lecturer: "Dr. John Doe",
      requirements: "None",
      literature: "Introduction to Programming by John Doe",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: "Data Structures",
      typeOfCourse: "Lecture",
      contactTimeInHours: 40,
      selfStudyTimeInHours: 80,
      workloadInHours: 120,
      teachType: "In-person",
      ects: 4,
      code: "CS102",
      lastOffer: "2022-09-01",
      nextOffer: "2023-09-01",
      contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      qualificationGoals: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      lecturer: "Dr. Jane Smith",
      requirements: "Introduction to Programming",
      literature: "Data Structures by Jane Smith",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

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

