/*
  Warnings:

  - A unique constraint covering the columns `[spontId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Made the column `spontId` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_spontId_fkey";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "spontId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link_spontId_key" ON "Link"("spontId");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_spontId_fkey" FOREIGN KEY ("spontId") REFERENCES "Spontaneous"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
