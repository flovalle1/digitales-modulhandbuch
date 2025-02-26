import TopNavigation from '@/components/common/TopNavigation';
import { prisma } from '@/prisma';
import { ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import theme from '../theme';


export const metadata: Metadata = {
  title: "Digitales Modulhandbuch",
  description: "Digitales Modulhandbuch Informatik Universität Tübingen.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const coursesWithLecturer = await prisma.course.findMany({
    include: {
      lecturer: true,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TopNavigation courses={coursesWithLecturer} />
      {children}
    </ThemeProvider>
  );
}
