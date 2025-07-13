import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "@/components/general/BlogPostCard";
import { BlogPostCardSkeleton } from "@/components/skeleton/BlogPostCardSkeleton";
import { Suspense } from "react";

async function getData() {
    const data = await prisma.blogs.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })

    return data;
}

export default async function BlogsRoute() {
    const { getPermission } = getKindeServerSession();
    
    const data = await getData();

    const requiredPermission = await getPermission('add:blog');

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold tracking-tight my-4">Sang's Blog Posts</h1>

                {requiredPermission?.isGranted && (
                    <Link className={buttonVariants()} href="/blogs/create">
                    Create Blog Post
                    </Link>
                )}
            </div>

            <Suspense
                fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <BlogPostCardSkeleton key={i} />
                    ))}
                </div>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item) => (
                        <BlogPostCard data={item} key={item.id}/>
                    ))}
                </div>
            </Suspense>
        </>
    )
}
