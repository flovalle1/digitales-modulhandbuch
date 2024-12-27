import { prisma } from "@/prisma";
import { ReactNode } from "react";
import { CoursesContext } from "./courses-context";



export const CoursesProvider = async ({ children }: { children: ReactNode }) => {
    const courses = await prisma.course.findMany();
    return (
        <CoursesContext.Provider value={{ courses }}>
            {children}
        </CoursesContext.Provider>
    );
};