import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "@/components/general/BlogPostCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
                <h1 className="text-3xl font-bold tracking-tight my-4">Sang's Blog Articles</h1>

                {requiredPermission?.isGranted && (
                    <Link className={buttonVariants()} href="/blogs/create">
                    Create Post
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense
                    fallback={
                    <div className="flex justify-center w-full">
                        {[...Array(6)].map((_, i) => (
                            <div
                            key={i}
                            className="rounded-xl border shadow-sm overflow-hidden"
                            >
                            <Skeleton className="h-48 w-full" />
                            <div className="p-4 space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                            </div>
                        ))}
                    </div>
                    }
                >
                    {data.map((item) => (
                        <BlogPostCard data={item} key={item.id}/>
                    ))}
                </Suspense>
            </div>
        </>
    )
}
