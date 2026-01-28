import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await prisma.projects.findMany({
        orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function POST(req: Request) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return redirect("/api/auth/register");
    }

    const formData = await req.formData();

    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const content = formData.get('content');
    const readTime = formData.get('readTime');
    const githubUrl = formData.get('githubUrl');
    const demoUrl = formData.get('demoUrl');
    const techIconUrls = JSON.parse(formData.get("techIconUrls") as string);

    await prisma.projects.create({
        data: {
            title: title as string,
            content: content as string,
            imageUrl: imageUrl as string,
            readTime: readTime as string,
            githubUrl: githubUrl as string,
            demoUrl: demoUrl as string,
            authorId: user.id,
            authorImage: user.picture as string,
            authorFirstName: user.given_name as string,
            authorLastName: user.family_name as string,
            techIconUrls: techIconUrls as string[],
        }
    });

    return NextResponse.json({ created: true });
}

// TODO: ERROR HANDLING & SS VALIDATION
