import { prisma } from "@/app/utils/db";

// async function getData() {
//     const data = await prisma.projects.findMany({
//         orderBy: {
//             createdAt: 'desc',
//         },
//     })
//     return data;
// }

export async function GET() {
  const data = await prisma.projects.findMany({
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

