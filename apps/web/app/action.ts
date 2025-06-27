"use server"

import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return redirect("/api/auth/register");
    }

    const title = formData.get('title');
    const content = formData.get('content');
    const imageUrl = formData.get('imageUrl');

    await prisma.blogPost.create({
        data: {
            // TO COMPLETE: ERROR HANDLING & SS VALIDATION
            title: title as string,
            content: content as string,
            imageUrl: imageUrl as string,
            authorId: user.id,
            authorImage: user.picture as string,
            authorFirstName: user.given_name as string,
            authorLastName: user.family_name as string,
        }
    })

    return redirect("/blogs");
}

export async function handleCommentSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return redirect("/api/auth/register");
    }

    const content = formData.get('content');
    const postId = formData.get('postId');

    await prisma.comment.create({
        data: {
            // TO COMPLETE: ERROR HANDLING & SS VALIDATION
            content: content as string,
            postId: postId as string,
            authorId: user.id,
            authorImage: user.picture as string,
            authorFirstName: user.given_name as string,
            authorLastName: user.family_name as string,
        }
    })

    // TO COMPLETE: no redirect and have it manifest on the current page
    return redirect(`/blogs/${postId}`);
}
