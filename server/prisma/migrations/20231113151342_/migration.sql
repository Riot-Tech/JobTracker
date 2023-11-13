-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_spontId_fkey";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "spontId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_spontId_fkey" FOREIGN KEY ("spontId") REFERENCES "Spontaneous"("id") ON DELETE SET NULL ON UPDATE CASCADE;
