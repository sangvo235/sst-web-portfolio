"use server"

import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function handleCommentSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return redirect("/api/auth/register");
    }

    const content = formData.get('content');
    const postId = formData.get("postId") as string | null;
    const projectId = formData.get("projectId") as string | null;

    await prisma.comment.create({
        data: {
            // TO COMPLETE: ERROR HANDLING & SS VALIDATION
            content: content as string,
            ...(postId ? { postId } : {}),
            ...(projectId ? { projectId } : {}),
            authorId: user.id,
            authorImage: user.picture as string,
            authorFirstName: user.given_name as string,
            authorLastName: user.family_name as string,
        }
    })

    // TO COMPLETE: no redirect and have it manifest on the current page
    if (projectId) {
        return redirect(`/projects/${projectId}`);
    }
    return redirect(`/blogs/${postId}`);
}

export async function handleProjectSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return redirect("/api/auth/register");
    }

    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const content = formData.get('content');
    const readTime = formData.get('readTime');
    const githubUrl = formData.get('githubUrl');
    const demoUrl = formData.get('demoUrl');
    const techIconUrl = formData.get('techIconUrl');

    const techIconUrls = typeof techIconUrl === 'string'
    ? techIconUrl.split(',').map(s => s.trim()).filter(Boolean)
    : [];

    await prisma.projects.create({
        data: {
            // TO COMPLETE: ERROR HANDLING & SS VALIDATION
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
    })

    // TO COMPLETE: no redirect and have it manifest on the current page
    return redirect(`/projects`);
}