/*
  Warnings:

  - Made the column `date` on table `Spontaneous` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "isCv" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Spontaneous" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
