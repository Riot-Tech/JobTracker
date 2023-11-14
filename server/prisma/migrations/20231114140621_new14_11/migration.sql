/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_appId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_spontId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "link" TEXT;

-- AlterTable
ALTER TABLE "Spontaneous" ADD COLUMN     "link" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gitHub" TEXT,
ADD COLUMN     "linkedIn" TEXT,
ADD COLUMN     "portfolio" TEXT;

-- DropTable
DROP TABLE "Link";

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "name" TEXT,
    "url" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "isCv" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
