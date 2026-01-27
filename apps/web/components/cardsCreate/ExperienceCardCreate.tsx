"use client";

import { useState } from "react";
import { useS3UploadHandler } from "@/hooks/useS3Upload";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SubmitButton } from "@/components/general/SubmitButton"
import { DatePicker } from "@/components/general/DatePicker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ExperienceCardCreate() {
    const { imageKey, isUploading, error, uploadFile } = useS3UploadHandler("experience");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const router = useRouter();

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (imageKey) {
        formData.set("imageUrl", imageKey);
        }

        const res = await fetch("/api/experience", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            router.push("/experience");
        } else {
            console.error("Failed to create experience post");
        }
    }

    return (
        <div className="pt-4">
            <Card className="max-w-lg mx-auto p-6">
                <CardHeader className="pt-4">
                    <CardTitle>Create Experience Post</CardTitle>
                    <CardDescription>Create a new experience post to share with everyone.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>                                                
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input name="title" type="text" placeholder="Title" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Company</Label>
                            <Input name="company" placeholder="Company" required/>
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


                        <div className="flex flex-col gap-2">
                            <Label>Image URL</Label>
                            <Input
                                name="imageFile"
                                type="file"
                                placeholder="Image URL" 
                                required
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    setImageFile(file);
                                    await uploadFile(file);
                                }}
                            />
                            <span className="pt-2">                  
                                {isUploading && (
                                    <p className="text-sm text-muted-foreground">Uploading image…</p>
                                )}

                                {imageKey && (
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${imageKey}`}
                                        alt="Uploaded Image Preview"
                                        width={196}
                                        height={196}
                                    />
                                )}

                                {error && (
                                    <p className="text-sm text-red-500">{error}</p>
                                )}
                            </span>
                        </div>                        

                        <SubmitButton disabled={isUploading || !imageKey} />
                    </form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    )
}