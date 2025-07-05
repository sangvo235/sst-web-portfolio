/*
  Warnings:

  - You are about to drop the column `skills` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "skills",
ADD COLUMN     "techIconUrl" TEXT[];
