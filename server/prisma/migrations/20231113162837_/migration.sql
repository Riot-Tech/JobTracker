/*
  Warnings:

  - Made the column `spontId` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_spontId_fkey";

-- DropIndex
DROP INDEX "Link_spontId_key";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "spontId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_spontId_fkey" FOREIGN KEY ("spontId") REFERENCES "Spontaneous"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
