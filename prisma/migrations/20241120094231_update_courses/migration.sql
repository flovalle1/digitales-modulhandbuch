/*
  Warnings:

  - You are about to drop the column `description` on the `Course` table. All the data in the column will be lost.
  - Added the required column `code` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contents` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ects` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastOffer` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lecturer` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextOffer` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qualificationGoeals` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teachType` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "description",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "contents" TEXT NOT NULL,
ADD COLUMN     "ects" INTEGER NOT NULL,
ADD COLUMN     "lastOffer" TEXT NOT NULL,
ADD COLUMN     "lecturer" TEXT NOT NULL,
ADD COLUMN     "nextOffer" TEXT NOT NULL,
ADD COLUMN     "qualificationGoeals" TEXT NOT NULL,
ADD COLUMN     "teachType" TEXT NOT NULL;
