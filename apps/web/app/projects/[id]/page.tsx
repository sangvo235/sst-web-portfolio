import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProjectPost } from "@/components/general/ProjectPost";
import { ProjectPostSkeleton } from "@/components/skeleton/ProjectPostSkeleton";

type Params = { id: string };

export default async function Page({
    params,
}: {
    params: Params;
}) {
    const { isAuthenticated, getPermission } =
        getKindeServerSession();

    if (!isAuthenticated()) {
        redirect("/api/auth/register");
    }

    const permission = await getPermission("comment:project");

    return (
        // !! = double negation to convert to boolean and handle undefined (only true and false)
        <Suspense fallback={<ProjectPostSkeleton />}>
            <ProjectPost id={params.id} canComment={!!permission?.isGranted} /> 
        </Suspense>
    );
}