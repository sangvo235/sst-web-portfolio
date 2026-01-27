import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import BlogCardCreate from "@/components/cardsCreate/BlogCardCreate";

export default async function CreateBlogPage() {
    const { isAuthenticated, getPermission } = getKindeServerSession();

    if (!isAuthenticated) {
        return redirect("/api/auth/register");
    }

    const requiredPermission = await getPermission('add:blog');
    if (!requiredPermission?.isGranted) {
        return redirect("/api/auth/register");
    }

    return (
        <BlogCardCreate />
    )
}
