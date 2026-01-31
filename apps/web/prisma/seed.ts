import "dotenv/config";
import fs from "fs";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// Make sure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set in .env");
}

// Prisma client with PostgreSQL adapter
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Loading JSON seed data...");

  // --- Load JSON files ---

  const blogsData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "prisma/seed_data/blogs.json"),
      "utf-8",
    ),
  );

  const educationData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "prisma/seed_data/education.json"),
      "utf-8",
    ),
  );

  const experienceData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "prisma/seed_data/experience.json"),
      "utf-8",
    ),
  );

  const projectsData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "prisma/seed_data/projects.json"),
      "utf-8",
    ),
  );

  const commentsData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "prisma/seed_data/comment.json"),
      "utf-8",
    ),
  );

  // --- Seed Blogs ---
  console.log("Seeding Blogs...");
  for (const blog of blogsData) {
    await prisma.blogs.upsert({
      where: { id: blog.id },
      update: {
        ...blog,
        createdAt: new Date(blog.createdAt),
        updatedAt: new Date(blog.updatedAt),
      },
      create: {
        ...blog,
        createdAt: new Date(blog.createdAt),
        updatedAt: new Date(blog.updatedAt),
      },
    });
  }

  // --- Seed Education ---
  console.log("Seeding Education...");
  for (const edu of educationData) {
    await prisma.education.upsert({
      where: { id: edu.id },
      update: {
        ...edu,
        dateStart: new Date(edu.dateStart),
        dateEnd: edu.dateEnd ? new Date(edu.dateEnd) : null,
      },
      create: {
        ...edu,
        dateStart: new Date(edu.dateStart),
        dateEnd: edu.dateEnd ? new Date(edu.dateEnd) : null,
      },
    });
  }

  // --- Seed Experience ---
  console.log("Seeding Experience...");
  for (const exp of experienceData) {
    await prisma.experience.upsert({
      where: { id: exp.id },
      update: {
        ...exp,
        dateStart: new Date(exp.dateStart),
        dateEnd: exp.dateEnd ? new Date(exp.dateEnd) : null,
      },
      create: {
        ...exp,
        dateStart: new Date(exp.dateStart),
        dateEnd: exp.dateEnd ? new Date(exp.dateEnd) : null,
      },
    });
  }

  // --- Seed Projects ---
  console.log("Seeding Projects...");
  for (const project of projectsData) {
    await prisma.projects.upsert({
      where: { id: project.id },
      update: {
        ...project,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt),
      },
      create: {
        ...project,
        createdAt: new Date(project.createdAt),
        updatedAt: new Date(project.updatedAt),
      },
    });
  }

  // --- Seed Comments ---
  console.log("Seeding Comments...");
  for (const comment of commentsData) {
    await prisma.comment.upsert({
      where: { id: comment.id },
      update: {
        ...comment,
        createdAt: new Date(comment.createdAt),
        updatedAt: new Date(comment.updatedAt),
      },
      create: {
        ...comment,
        createdAt: new Date(comment.createdAt),
        updatedAt: new Date(comment.updatedAt),
      },
    });
  }

  console.log("Seeding Complete!");
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
