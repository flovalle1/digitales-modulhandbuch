/*
  Warnings:

  - You are about to drop the column `qualificationGoeals` on the `Course` table. All the data in the column will be lost.
  - Added the required column `contactTimeInHours` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `literature` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualificationGoals` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selfStudyTimeInHours` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeOfCourse` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workloadInHours` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "qualificationGoeals",
ADD COLUMN     "contactTimeInHours" INTEGER NOT NULL,
ADD COLUMN     "literature" TEXT NOT NULL,
ADD COLUMN     "qualificationGoals" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "selfStudyTimeInHours" INTEGER NOT NULL,
ADD COLUMN     "typeOfCourse" TEXT NOT NULL,
ADD COLUMN     "workloadInHours" INTEGER NOT NULL,
ALTER COLUMN "lastOffer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
