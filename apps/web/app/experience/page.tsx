import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ExperienceCardCombo from "@/components/cardsCombination/ExperienceCardCombo";

export default async function ExperiencePage() {
    const { getPermission } = getKindeServerSession();
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

            <ExperienceCardCombo />
        </div>
    )
}
