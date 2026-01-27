import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return redirect("/api/auth/register");
    }

    const formData = await req.formData();

    const content = formData.get('content');
    const postId = formData.get("postId") as string | null;
    const projectId = formData.get("projectId") as string | null;

    await prisma.comment.create({
        data: {
            content: content as string,
            ...(postId ? { postId } : {}),
            ...(projectId ? { projectId } : {}),
            authorId: user.id,
            authorImage: user.picture as string,
            authorFirstName: user.given_name as string,
            authorLastName: user.family_name as string,
        }
    })

    return NextResponse.json({
        success: true,
        redirectTo: projectId ? `/projects/${projectId}` : `/blogs/${postId}`,
    });
}

// TODO: ERROR HANDLING & SS VALIDATION
