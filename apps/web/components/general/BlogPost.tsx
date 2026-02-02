import { prisma } from "@/app/utils/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TOPICS, type TopicKey } from "@/constants/topics";
import { BiComment, BiSolidPurchaseTag } from "react-icons/bi";
import { ArrowLeft } from "lucide-react";
import Comment from "@/components/general/Comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

async function getData(id: string) {
  const data = await prisma.blogs.findUnique({
    where: { id: id },
    include: {
      comments: true,
      _count: {
        select: { comments: true },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return {
    ...data,
    topic: data.topic as TopicKey | null,
  };
}

export async function BlogPost({
  id,
  canComment,
}: {
  id: string;
  canComment: boolean;
}) {
  const data = await getData(id);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-6 pt-4 pl-8">
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href="/blogs"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to posts
        </Link>
      </div>
      <div className="col-start-2 col-span-4 py-2 text-5xl font-bold">
        {data.title}
      </div>
      <div className="col-start-2 col-span-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={data.authorImage}
              alt={`${data.authorFirstName} ${data.authorLastName}`}
            />
            <AvatarFallback>
              {data.authorFirstName?.[0]}
              {data.authorLastName?.[0]}
            </AvatarFallback>
          </Avatar>

          <div className="text-md font-medium text-gray-700 dark:text-gray-200">
            {data.authorFirstName} {data.authorLastName}
          </div>

          <div className="text-md text-gray-500 dark:text-gray-400 flex items-center">
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

        <div>
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
          >
            <BiSolidPurchaseTag />
            {data.topic && TOPICS[data.topic]}
          </Badge>
        </div>
      </div>
      <div className="col-start-2 col-span-4 relative h-96 w-full overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${data.imageUrl}`}
          alt="Image for Blog"
          fill
          className="object-scale-down transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="col-start-2 col-span-4 text-md text-gray-600 dark:text-gray-300 py-4 whitespace-pre-line">
        {data.content}
      </div>
      <div
        className="col-start-2 col-span-4 text-xl font-semibold"
        id="comments"
      >
        Comments
      </div>
      {data.comments.length === 0 ? (
        <div className="col-start-2 col-span-4 text-sm text-gray-500 dark:text-gray-400 italic pl-6">
          No comments yet.
        </div>
      ) : (
        data.comments.map((comment) => (
          <Card className="col-start-2 col-span-4 p-2" key={comment.id}>
            <CardHeader className="p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={comment.authorImage}
                        alt={`${comment.authorFirstName} ${comment.authorLastName}`}
                      />
                      <AvatarFallback>
                        {comment.authorFirstName?.[0]}
                        {comment.authorLastName?.[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {comment.authorFirstName} {comment.authorLastName}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Intl.DateTimeFormat("en-AU", {
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
              <div className="text-sm text-gray-800 dark:text-gray-100">
                {comment.content}
              </div>
            </CardContent>
            <CardFooter />
          </Card>
        ))
      )}

      <div className="col-start-2 col-span-4 py-4">
        {canComment ? (
          <Comment postId={id} />
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            Please login or sign up to post a comment.
          </p>
        )}
      </div>
    </div>
  );
}
