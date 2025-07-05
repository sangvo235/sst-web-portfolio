import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { handleProjectSubmission } from "@/app/action"
import { SubmitButton } from "@/components/general/SubmitButton"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

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
        <div className="pt-4">
            <Card className="max-w-lg mx-auto p-6">
                <CardHeader className="pt-4">
                    <CardTitle>Create Project</CardTitle>
                    <CardDescription>Create a new project to share with everyone.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col gap-4" action={handleProjectSubmission}>
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input name="title" required type="text" placeholder="Title"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Read Time</Label>
                            <Input name="readTime" required type="text" placeholder="Read Time"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Image URL</Label>
                            <Input name="imageUrl" required type="url" placeholder="Image URL"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>GitHub URL</Label>
                            <Input name="githubUrl" required type="url" placeholder="GitHub URL"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Demo URL</Label>
                            <Input name="demoUrl" required type="url" placeholder="Demo URL"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Description</Label>
                            <Textarea name="description" required placeholder="Description"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Tech Icon URLs</Label>
                            <Textarea name="techIconUrl" required placeholder="Tech Icon Urls"/>
                        </div>

                        <SubmitButton />
                    </form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    )
}