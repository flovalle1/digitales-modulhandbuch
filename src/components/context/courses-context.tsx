"use client";
import { Course } from '@prisma/client';
import { createContext, useContext } from 'react';

type CoursesContextType = {
    courses: Course[];
};

export const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const useCourses = () => {
    const context = useContext(CoursesContext);
    if (context === undefined) {
        throw new Error('useCourses must be used within a CoursesProvider');
    }
    return context;
};
