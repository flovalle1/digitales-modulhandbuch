/*
  Warnings:

  - You are about to drop the column `lastOffer` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `nextOffer` on the `Course` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('Sommersemester', 'Wintersemester');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Assignment" ADD VALUE 'practical_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'theoretical_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'technical_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'info_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'sequence_bio_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'structure_system_bio_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'bio_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'research_bio_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'practical_bio_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'practical_info_bio_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'theoretical_info_bio_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'info_bio_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'hci_media_production_media_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'web_internet_media_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'graphics_visual_media_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'multimedia_tech_media_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'media_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'practical_media_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'advanced_media_cs_info_master';
ALTER TYPE "Assignment" ADD VALUE 'advanced_media_cs_application_master';
ALTER TYPE "Assignment" ADD VALUE 'advanced_medic_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'advanced_bio_medic_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'research_medic_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'medic_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'biomedical_medic_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'medical_tech_medic_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'info_medic_cs_master';
ALTER TYPE "Assignment" ADD VALUE 'basics_ml_master';
ALTER TYPE "Assignment" ADD VALUE 'diverse_ml_master';
ALTER TYPE "Assignment" ADD VALUE 'info_ml_master';

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "lastOffer",
DROP COLUMN "nextOffer",
ADD COLUMN     "lastOfferSemester" "Semester" NOT NULL DEFAULT 'Sommersemester',
ADD COLUMN     "lastOfferYear" INTEGER NOT NULL DEFAULT 2000,
ADD COLUMN     "nextOfferSemester" "Semester" NOT NULL DEFAULT 'Sommersemester',
ADD COLUMN     "nextOfferYear" INTEGER NOT NULL DEFAULT 2000,
ADD COLUMN     "semesterPeriod" INTEGER NOT NULL DEFAULT 0;
