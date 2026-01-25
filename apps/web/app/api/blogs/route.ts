import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const topic = url.searchParams.get("topic");
  const sort = url.searchParams.get("sort") ?? "desc";
  const sortBy = url.searchParams.get("sortBy") ?? "createdAt";

  const where = topic && topic !== "all" ? { topic } : {};
  const orderBy: any = {};
  orderBy[sortBy] = sort;

  const blogs = await prisma.blogs.findMany({
    where,
    orderBy,
  });

  return NextResponse.json(blogs);
}
