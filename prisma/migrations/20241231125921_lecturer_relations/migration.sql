/*
  Warnings:

  - You are about to drop the column `courses` on the `Lecturer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "lecturerId" INTEGER;

-- AlterTable
ALTER TABLE "Lecturer" DROP COLUMN "courses";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_lecturerId_fkey" FOREIGN KEY ("lecturerId") REFERENCES "Lecturer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
