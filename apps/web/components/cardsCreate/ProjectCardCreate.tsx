"use client"

import { useState } from "react";
import { useS3UploadHandler } from "@/hooks/useS3Upload";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SubmitButton } from "@/components/general/SubmitButton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProjectCardCreate() {
    const { imageKey, isUploading, error, uploadFile } = useS3UploadHandler("projects");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const router = useRouter();

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (imageKey) {
        formData.set("imageUrl", imageKey);
        }

        const res = await fetch("/api/projects", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            router.push("/projects");
        } else {
            console.error("Failed to create project post");
        }
    }

    return (
        <div className="pt-4">
            <Card className="max-w-lg mx-auto p-6">
                <CardHeader className="pt-4">
                    <CardTitle>Create Project Post</CardTitle>
                    <CardDescription>Create a new project post to share with everyone.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
                            <Label>GitHub URL</Label>
                            <Input name="githubUrl" type="url" placeholder="GitHub URL" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Demo URL</Label>
                            <Input name="demoUrl" type="url" placeholder="Demo URL" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Tech Icon URLs</Label>
                            <Textarea name="techIconUrl" placeholder="Tech Icon Urls" required/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Content</Label>
                            <Textarea name="content" placeholder="content" required/>
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