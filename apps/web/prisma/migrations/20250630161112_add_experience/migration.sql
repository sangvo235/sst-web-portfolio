-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "skills" TEXT[],

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);
