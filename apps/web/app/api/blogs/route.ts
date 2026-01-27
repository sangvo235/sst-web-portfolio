import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return redirect("/api/auth/register");
    }

    const formData = await req.formData();

    const title = formData.get('title');
    const readTime = formData.get('readTime');
    const topic = formData.get('topic');
    const imageUrl = formData.get('imageUrl');
    const content = formData.get('content');
    
    await prisma.blogs.create({
        data: {
            title: title as string,
            content: content as string,
            readTime: readTime as string,
            topic: topic as string,
            imageUrl: imageUrl as string,
            authorId: user.id,
            authorImage: user.picture as string,
            authorFirstName: user.given_name as string,
            authorLastName: user.family_name as string,
        }
    })

    return redirect("/blogs");
}

// TODO: ERROR HANDLING & SS VALIDATION
// TODO: content make dotpoints
