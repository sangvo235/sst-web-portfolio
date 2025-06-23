"use server"

import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
        throw new Error("User not found");
    }

    const title = formData.get('title');
    const content = formData.get('content');
    const imageUrl = formData.get('imageUrl');

    const data = await prisma.blogPost.create({
        data: {
            // TO COMPLETE: SS VALIDATION
            title: title as string,
            content: content as string,
            imageUrl: imageUrl as string,
            authorId: user.id,
            authorImage: user.picture as string,
            authorName: user.given_name as string,
        }
    })

    return redirect("/dashboard");
}
