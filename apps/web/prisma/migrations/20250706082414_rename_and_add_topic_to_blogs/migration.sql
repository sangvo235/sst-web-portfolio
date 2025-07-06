/*
  Warnings:

  - You are about to drop the `BlogPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropTable
DROP TABLE "BlogPost";

-- CreateTable
CREATE TABLE "Blogs" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "authorFirstName" TEXT NOT NULL,
    "authorLastName" TEXT NOT NULL,
    "authorImage" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "topic" TEXT,
    "readTime" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Blogs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
