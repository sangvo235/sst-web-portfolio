import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ExperienceCard } from "@/components/cards/ExperienceCard";

//TODO: ADD SKELETON & SUSPENSION!

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

            <div className="mx-auto max-w-3xl px-6 md:max-w-5xl">
                {data.map((item) => (
                    <ExperienceCard key={item.id} data={item} />
                ))}
            </div>
        </div>
    )
}