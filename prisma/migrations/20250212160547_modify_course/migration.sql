-- CreateEnum
CREATE TYPE "Language" AS ENUM ('Deutsch', 'Englisch');

-- AlterEnum
ALTER TYPE "Semester" ADD VALUE 'keineAngabe';

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "courseLanguage" "Language" NOT NULL DEFAULT 'Deutsch',
ADD COLUMN     "durationInSemester" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "typeOfExamination" TEXT NOT NULL DEFAULT 'Klausur';

-- CreateTable
CREATE TABLE "CourseContent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "teachingMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "creditPoints" INTEGER NOT NULL,
    "expectedHoursPerWeek" INTEGER NOT NULL,
    "examType" TEXT NOT NULL,
    "examDurationInMinutes" INTEGER NOT NULL,
    "grading" TEXT NOT NULL,
    "gradingShareInPercent" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CourseContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
