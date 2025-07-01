import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { handleEducationSubmission } from "@/app/action"
import { SubmitButton } from "@/components/general/SubmitButton"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";

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
                    <CardTitle>Create Education</CardTitle>
                    <CardDescription>Create a new education to share with everyone.</CardDescription>
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
                        
                        <div className="flex flex-col gap-2">
                            <Label>Start Date</Label>
                            <Input name="startDate" type="text" placeholder="Start Date" required disabled/>
                            {/* TODO: FIGURE OUT FIX TO DATEPICKER PASSING PROPS for server side. */}
                            {/* <DatePicker name="startDate" required placeholder="Start Date"/> */}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Start Date</Label>
                            <Input name="endDate" type="text" placeholder="End Date" required disabled/>
                            {/* TODO: FIGURE OUT FIX TO DATEPICKER PASSING PROPS for server side. */}
                            {/* <DatePicker name="startDate" required placeholder="Start Date"/> */}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Image URL</Label>
                            <Input name="imageUrl" type="url" placeholder="Image URL" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Description</Label>
                            <Textarea name="description" placeholder="Description" required/>
                        </div>

                        <SubmitButton />
                    </form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    )
}