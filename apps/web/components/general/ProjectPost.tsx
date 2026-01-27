import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/app/utils/db";
import { notFound } from "next/navigation"
import { handleCommentSubmission } from "@/app/action"
import { SubmitButton } from "@/components/general/SubmitButton"
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { BiComment } from "react-icons/bi";
import { BsGithub, BsArrowUpRightSquare } from "react-icons/bs";
import { ArrowLeft } from "lucide-react";

async function getData(id: string) {
    const data = await prisma.projects.findUnique({
        where: { id: id },
        include: {
            comments: true,
            _count: {
                select: { comments: true },
            },
        },
    });

    if(!data) {
        return notFound();
    }

    return data;
}

export async function ProjectPost ({ id, canComment }: { id: string; canComment: boolean; }) {
    const data = await getData(id);

    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-6 pt-4 pl-8">
                <Link className={buttonVariants({ variant: "secondary" })} href="/projects">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back to posts
                </Link>
            </div>

            <div className="col-start-2 col-span-4 py-2 text-5xl font-bold">
                {data.title}
            </div>

            <div className="col-start-2 col-span-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="relative size-8 overflow-hidden rounded-full">
                        <Image
                        src={data.authorImage}
                        alt={`${data.authorFirstName} ${data.authorLastName}`}
                        fill
                        className="object-cover"
                        />
                    </div>

                    <div className="text-md font-medium text-gray-700">
                        {data.authorFirstName} {data.authorLastName}
                    </div>

                    <div className="text-md text-gray-500 flex items-center">
                        <span>{data.readTime} min read</span>
                        <span className="mx-2">&bull;</span>
                        <span>
                            {new Intl.DateTimeFormat("en-AU", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            }).format(new Date(data.createdAt))}
                        </span>

                        <span className="mx-2">&bull;</span>
                    
                        <Link
                            href="#comments"
                            className="flex items-center gap-1 px-2 py-1 rounded hover:text-blue-500"
                            aria-label="View comments"
                        >
                            {data._count.comments}
                            <BiComment className="text-md" />
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href={data.githubUrl} >
                        <BsGithub className="size-8 hover:text-blue-500 hover:-translate-y-1 transition-transform cursor-pointer" />
                    </Link>

                    <Link href={data.demoUrl} >
                        <BsArrowUpRightSquare className="size-8 hover:text-blue-500 hover:-translate-y-1 transition-transform cursor-pointer" />
                    </Link>
                </div>
            </div>

            <div className="col-start-2 col-span-4 relative h-96 w-full overflow-hidden">
                <Image
                    src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${data.imageUrl}`}
                    alt="Image for Project"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="col-start-2 col-span-4 py-2 flex flex-col items-center space-y-2">
                <div className="text-xl font-semibold">Tech Stack</div>

                {data.techIconUrls && data.techIconUrls.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {data.techIconUrls.map((iconUrl, idx) => (
                            <div key={idx} className="w-8 h-8 relative">
                                <Image
                                src={iconUrl}
                                alt={`tech icon ${idx + 1} for Project`}
                                fill
                                className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
  
            <div className="col-start-2 col-span-4 text-md text-gray-600 py-2">
                {data.content}
            </div>
          
            <span id="comments" />

            <p className="col-start-2 col-span-4 text-xl font-semibold">
                Comments
            </p>

            {data.comments.length === 0 ? (
                <div className="col-start-2 col-span-4 text-sm text-gray-500 italic">
                    No comments yet.
                </div>
                ) : (
                data.comments.map((comment) => (
                    <Card className="col-start-2 col-span-4 p-4" key={comment.id}>
                        <CardHeader className="p-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="relative size-8 overflow-hidden rounded-full">
                                    <Image
                                        src={comment.authorImage}
                                        alt={`${comment.authorFirstName} ${comment.authorLastName}`}
                                        fill
                                        className="object-cover"
                                    />
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {comment.authorFirstName} {comment.authorLastName}
                                    </p>
                                </div>

                                <div className="text-sm text-gray-500">
                                    {new Intl.DateTimeFormat("en-au", {
                                        minute: "2-digit",
                                        hour: "numeric",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }).format(new Date(comment.createdAt))}
                                </div>
                            </div>
                        </CardHeader>
                        
                        <CardContent>
                            <div className="text-sm text-gray-800 pl-8">
                                {comment.content}
                            </div>
                        </CardContent>
                        <CardFooter />
                    </Card>
                ))
            )}
        
            {canComment && (
                <div className="col-start-2 col-span-4 px-6">
                    <Label className="py-2">Add your comment</Label>
                    <div>
                        <form className="flex flex-col gap-4 mb-4" action={handleCommentSubmission}>
                            <Input type="hidden" name="postId" value={id} />

                            <div className="flex flex-col gap-2">
                                <Textarea name="content" required placeholder="Content"/>
                            </div>

                            <SubmitButton />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// TODO: Mobile Views
// TODO: Image Link to Project