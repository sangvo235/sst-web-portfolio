import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProjectCard } from "@/components/general/ProjectCard";
import { Suspense } from "react";
import { ProjectCardSkeleton } from "@/components/skeleton/ProjectCardSkeleton";

async function getData() {
    const data = await prisma.projects.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })
    return data;
}

export default async function ProjectPage() {
    const { getPermission } = getKindeServerSession();
    const data = await getData();
    const requiredPermission = await getPermission('add:project');

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold tracking-tight my-4">Sang's Projects</h1>

                {requiredPermission?.isGranted && (
                    <Link className={buttonVariants()} href="/projects/create">
                    Create Project
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={<ProjectCardSkeleton />}>
                    {data.map((item) => (
                        <ProjectCard data={item} key={item.id}/>
                    ))}
                </Suspense>
            </div>
        </>
    )
}
