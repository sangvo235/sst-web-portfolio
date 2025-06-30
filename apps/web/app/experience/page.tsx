import Experience from '@/components/general/Experience';
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "@/components/general/BlogPostCard";
// import { Suspense } from "react";
// import { Skeleton } from "@/components/ui/skeleton";


async function getData() {
    const data = await prisma.experience.findMany({
        orderBy: {
            dateEnd: 'desc',
        },
    })

    return data;
}

export default async function ExperiencePage() {
    const { getPermission } = getKindeServerSession();
    
    const data = await getData();

    const requiredPermission = await getPermission('add:experience');

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold tracking-tight my-4">Experience</h1>

                {requiredPermission?.isGranted && (
                    <Link className={buttonVariants()} href="/experience/create">
                    Create Experience
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Experience />
            </div>
        </div>
    )
}

//TODO: ADD SKELETON & SUSPENSION