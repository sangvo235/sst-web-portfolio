/*
  Warnings:

  - Added the required column `authorFirstName` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorImage` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorLastName` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "authorFirstName" TEXT NOT NULL,
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "authorImage" TEXT NOT NULL,
ADD COLUMN     "authorLastName" TEXT NOT NULL;
