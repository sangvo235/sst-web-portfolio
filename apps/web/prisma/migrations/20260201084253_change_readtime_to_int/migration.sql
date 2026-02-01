/*
  Warnings:

  - Changed the type of `readTime` on the `Blogs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `readTime` on the `Projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "readTime",
ADD COLUMN     "readTime" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "readTime",
ADD COLUMN     "readTime" INTEGER NOT NULL;
