import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import ProjectCardCreate from "@/components/cardsCreate/ProjectCardCreate";

export default async function CreateProjectPage() {

    const { isAuthenticated, getPermission } = getKindeServerSession();

    if (!isAuthenticated) {
        return redirect("/api/auth/register");
    }

    const requiredPermission = await getPermission('add:project');
    if (!requiredPermission?.isGranted) {
        return redirect("/api/auth/register");
    }

    return (
        <ProjectCardCreate />
    )
}
