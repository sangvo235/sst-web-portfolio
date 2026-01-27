import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import EducationCardCreate from "@/components/cardsCreate/EducationCardCreate";

export default async function CreateEducationPage() {

    const { isAuthenticated, getPermission } = getKindeServerSession();

    if (!isAuthenticated) {
        return redirect("/api/auth/register");
    }

    const requiredPermission = await getPermission('add:education');
    if (!requiredPermission?.isGranted) {
        return redirect("/api/auth/register");
    }

    return (
        <EducationCardCreate />
    )
}