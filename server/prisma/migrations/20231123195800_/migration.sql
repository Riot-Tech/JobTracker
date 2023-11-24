-- CreateEnum
CREATE TYPE "jobType" AS ENUM ('FULLTIME', 'PART_TIME', 'FREELANCE', 'UNSPECIFIED');

-- CreateEnum
CREATE TYPE "jobModality" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID', 'UNSPECIFIED');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'SUBMITTED', 'INTERVIEW_SCHEDULED', 'HIRED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "linkedIn" TEXT,
    "gitHub" TEXT,
    "portfolio" TEXT,
    "profilePicture" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "jobName" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "jobType" "jobType" NOT NULL DEFAULT 'UNSPECIFIED',
    "jobModality" "jobModality" NOT NULL DEFAULT 'UNSPECIFIED',
    "location" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedIncome" INTEGER,
    "currency" TEXT,
    "status" "status" NOT NULL DEFAULT 'PENDING',
    "feedback" TEXT,
    "comments" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spontaneous" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "receiver" TEXT,
    "company" TEXT,
    "location" TEXT,
    "feedback" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "link" TEXT,

    CONSTRAINT "Spontaneous_pkey" PRIMARY KEY ("id")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spontaneous" ADD CONSTRAINT "Spontaneous_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
