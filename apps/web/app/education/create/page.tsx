import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { handleEducationSubmission } from "@/app/action"
import { SubmitButton } from "@/components/general/SubmitButton"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import { DatePicker } from "@/components/general/DatePicker"

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
        <div className="pt-4">
            <Card className="max-w-lg mx-auto p-6">
                <CardHeader className="pt-4">
                    <CardTitle>Create Education Post</CardTitle>
                    <CardDescription>Create a new education post to share with everyone.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col gap-4" action={handleEducationSubmission}>
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input name="title" type="text" placeholder="Title eg. Degree Type" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Name</Label>
                            <Input name="name" type="text" placeholder="Name eg. University" required/>
                        </div>
                        
                        <DatePicker name="dateStart" label="Start Date"/>
                        <DatePicker name="dateEnd" label="End Date"/>

                        <div className="flex flex-col gap-2">
                            <Label>Image URL</Label>
                            <Input name="imageUrl" type="url" placeholder="Image URL" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Content</Label>
                            <Textarea name="content" placeholder="Content" required/>
                        </div>

                        <SubmitButton />
                    </form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    )
}