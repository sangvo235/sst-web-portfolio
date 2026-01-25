import { prisma } from "@/app/utils/db";

export async function GET() {
  const data = await prisma.education.findMany({
    orderBy: { id: "desc" },
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
