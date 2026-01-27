"use client"

import { useState } from "react";
import { useS3UploadHandler } from "@/hooks/useS3Upload";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/general/SubmitButton";
import { DatePicker } from "@/components/general/DatePicker";

export default function EducationCardCreate() {
    const { imageKey, isUploading, error, uploadFile } = useS3UploadHandler("education");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const router = useRouter();

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (imageKey) {
        formData.set("imageUrl", imageKey);
        }

        const res = await fetch("/api/education", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            router.push("/education");
        } else {
            console.error("Failed to create education post");
        }
    }

    return (
        <div className="pt-4">
            <Card className="max-w-lg mx-auto p-6">
                <CardHeader className="pt-4">
                    <CardTitle>Create Education Post</CardTitle>
                    <CardDescription>Create a new education post to share with everyone.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
                            <Label>Content</Label>
                            <Textarea name="content" placeholder="Content" required/>
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
                                        alt="Uploaded preview"
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