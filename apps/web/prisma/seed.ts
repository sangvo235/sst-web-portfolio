import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

// Make sure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env')
}

// Prisma client with PostgreSQL adapter
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Loading JSON seed data...');

  const educationData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'prisma/seed_data/education.json'), 'utf-8')
  )

  const experienceData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'prisma/seed_data/experience.json'), 'utf-8')
  )

  console.log('Seeding Education...');
  for (const edu of educationData) {
    await prisma.education.upsert({
      where: { id: edu.id || '' }, // Use existing ID or empty string (Prisma will fail on empty, you can remove and generate UUID if needed)
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
    })
  }

  console.log('Seeding Experience...');
  for (const exp of experienceData) {
    await prisma.experience.upsert({
      where: { id: exp.id || '' },
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
    })
  }

  console.log('Seeding Complete!');
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
