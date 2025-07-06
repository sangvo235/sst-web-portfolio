import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { handleProjectSubmission } from "@/app/action"
import { SubmitButton } from "@/components/general/SubmitButton"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
                    <CardTitle>Create Project Post</CardTitle>
                    <CardDescription>Create a new project post to share with everyone.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col gap-4" action={handleProjectSubmission}>
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input name="title" required type="text" placeholder="Title"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Read Time</Label>
                            <Select name="readTime" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2">2 mins</SelectItem>
                                <SelectItem value="5">5 mins</SelectItem>
                                <SelectItem value="10">10 mins</SelectItem>
                                <SelectItem value="15">15 mins</SelectItem>
                                <SelectItem value="20">20 mins</SelectItem>
                                <SelectItem value="25">25 mins</SelectItem>
                                <SelectItem value="> 30">Over 30 mins</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Image URL</Label>
                            <Input name="imageUrl" type="url" placeholder="Image URL" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>GitHub URL</Label>
                            <Input name="githubUrl" type="url" placeholder="GitHub URL" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Demo URL</Label>
                            <Input name="demoUrl" type="url" placeholder="Demo URL" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Content</Label>
                            <Textarea name="content" placeholder="content" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Tech Icon URLs</Label>
                            <Textarea name="techIconUrl" placeholder="Tech Icon Urls" required/>
                        </div>

                        <SubmitButton />
                    </form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    )
}