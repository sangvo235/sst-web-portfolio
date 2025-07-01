-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "demoUrl" TEXT NOT NULL,
    "skills" TEXT[],

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);
