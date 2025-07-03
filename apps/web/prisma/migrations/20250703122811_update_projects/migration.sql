/*
  Warnings:

  - You are about to drop the column `techIconUrl` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "techIconUrl",
ADD COLUMN     "techIconUrls" TEXT[];
