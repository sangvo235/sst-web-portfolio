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
    const readTime = formData.get('readTime');
    const imageUrl = formData.get('imageUrl');
    const content = formData.get('content');

    await prisma.blogPost.create({
        data: {
            // TO COMPLETE: ERROR HANDLING & SS VALIDATION
            title: title as string,
            content: content as string,
            readTime: readTime as string,
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

export async function handleExperienceSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return redirect("/api/auth/register");
    }

    const imageUrl = formData.get('imageUrl');
    const title = formData.get('title');
    const company = formData.get('company');
    // TODO: NEED TO FIX DATE FORM DATA
    // const dateStart = formData.get('dateStart');
    const dateStart = "2050-01-01";
    const dateEnd = formData.get('dateEnd');
    const description = formData.get('description');
    const skill = formData.get('skill');

    const skills = typeof skill === 'string'
    ? skill.split(',').map(s => s.trim()).filter(Boolean)
    : [];

    await prisma.experience.create({
        data: {
            // TODO: ERROR HANDLING & SS VALIDATION
            imageUrl: imageUrl as string,
            title: title as string,
            company: company as string,
            dateStart: new Date(dateStart as string),
            dateEnd: dateEnd ? new Date(dateEnd as string) : null,
            description: description as string,
            skills: skills as string[],
        }
    })

    // TO COMPLETE: no redirect and have it manifest on the current page
    return redirect("/experience");
}

export async function handleEducationSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return redirect("/api/auth/register");
    }

    // description make dotpoints

    const imageUrl = formData.get('imageUrl');
    const title = formData.get('title');
    const name = formData.get('name');
    // TODO: NEED TO FIX DATE FORM DATA
    // const dateStart = formData.get('dateStart');
    const dateStart = "2050-01-01";
    const dateEnd = formData.get('dateEnd');
    const description = formData.get('description');

    await prisma.education.create({
        data: {
            // TODO: ERROR HANDLING & SS VALIDATION
            imageUrl: imageUrl as string,
            title: title as string,
            name: name as string,
            dateStart: new Date(dateStart as string),
            dateEnd: dateEnd ? new Date(dateEnd as string) : null,
            description: description as string,
        }
    })
    
    // TO COMPLETE: no redirect and have it manifest on the current page
    return redirect("/education");
}

export async function handleProjectSubmission(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    if (!user) {
        return redirect("/api/auth/register");
    }

    const title = formData.get('title');
    const imageUrl = formData.get('imageUrl');
    const description = formData.get('description');
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
            description: description as string,
            imageUrl: imageUrl as string,
            githubUrl: githubUrl as string,
            demoUrl: demoUrl as string,
            techIconUrls: techIconUrls as string[],
        }
    })

    // TO COMPLETE: no redirect and have it manifest on the current page
    return redirect(`/projects`);
}