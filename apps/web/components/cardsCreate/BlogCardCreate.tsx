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

export default function BlogCardCreate() {
    const { imageKey, isUploading, error, uploadFile } = useS3UploadHandler("blogs");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const router = useRouter();

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        if (imageKey) {
        formData.set("imageUrl", imageKey);
        }

        const res = await fetch("/api/blogs", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            router.push("/blogs");
        } else {
            console.error("Failed to create blog post");
        }
    }
    
    return (
        <div className="pt-4">
            <Card className="max-w-lg mx-auto p-6">
                <CardHeader className="pt-4">
                    <CardTitle>Create Blog Post</CardTitle>
                    <CardDescription>Create a new blog post to share with everyone.</CardDescription>
                </CardHeader>

                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input name="title" type="text" placeholder="Title" required/>
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
                            <Label>Topic</Label>
                            <Select name="topic" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="Career">Career</SelectItem>
                                    <SelectItem value="Education">Education</SelectItem>
                                    <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                                    <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                                    <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                                    <SelectItem value="Technology">Technology</SelectItem>
                                    <SelectItem value="Travel">Travel</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

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
                                        alt="Uploaded Image Preview"
                                        width={164}
                                        height={164}
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