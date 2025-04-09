-- CreateEnum
CREATE TYPE "Assignment" AS ENUM ('mandatory_cs', 'mandatory_mathematics_cs', 'mandatory_proseminar_cs', 'elective_practical_cs', 'elective_theoretical_cs', 'elective_technical_cs', 'elective_info_cs', 'mandatory_bio_cs', 'mandatory_proseminar_bio_cs', 'elective_info_bio_cs', 'elective_bioinfo_bio_cs', 'mandatory_media_cs', 'mandatory_proseminar_media_cs', 'elective_mediascience_media_cs', 'elective_mediainfo_media_cs', 'elective_info_media_cs', 'mandatory_medic_cs', 'mandatory_proseminar_medic_cs', 'elective_info_medic_cs', 'elective_mediabioinf_medic_cs');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "assignments" "Assignment"[];

-- CreateTable
CREATE TABLE "Lecturer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courses" TEXT[],

    CONSTRAINT "Lecturer_pkey" PRIMARY KEY ("id")
);
