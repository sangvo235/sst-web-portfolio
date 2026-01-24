import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { handleExperienceSubmission } from "@/app/action"
import { SubmitButton } from "@/components/general/SubmitButton"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation";
import { DatePicker } from "@/components/general/DatePicker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default async function CreateExperiencePage() {

    const { isAuthenticated, getPermission } = getKindeServerSession();

    if (!isAuthenticated) {
        return redirect("/api/auth/register");
    }

    const requiredPermission = await getPermission('add:experience');
    if (!requiredPermission?.isGranted) {
        return redirect("/api/auth/register");
    }

    return (
        <div className="pt-4">
            <Card className="max-w-lg mx-auto p-6">
                <CardHeader className="pt-4">
                    <CardTitle>Create Experience Post</CardTitle>
                    <CardDescription>Create a new experience post to share with everyone.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col gap-4" action={handleExperienceSubmission}>                                                
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input name="title" type="text" placeholder="Title" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Company</Label>
                            <Input name="company" placeholder="Company" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Image URL</Label>
                            <Input name="imageUrl" type="url" placeholder="Image URL" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Type</Label>
                            <Select name="type" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Full-time">Full-time</SelectItem>
                                <SelectItem value="Part-time">Part-time</SelectItem>
                                <SelectItem value="Self-employed">Self-employed</SelectItem>
                                <SelectItem value="Freelance">Freelance</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Internship">Internship</SelectItem>
                            </SelectContent>
                            </Select>
                        </div>
                            
                        <DatePicker name="dateStart" label="Start Date"/>
                        <DatePicker name="dateEnd" label="End Date"/>

                        <div className="flex flex-col gap-2">
                            <Label>Location</Label>
                            <Input name="location" placeholder="Location" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Content</Label>
                            <Textarea name="content" placeholder="content" required/>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <Label>Skills</Label>
                            <Textarea name="skill" placeholder="Skills"/>
                        </div>

                        <SubmitButton />
                    </form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    )
}