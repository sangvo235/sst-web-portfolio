import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { TOPICS, type TopicKey } from "@/constants/topics";

export type BlogCardData = {
  id: string;
  title: string;
  content: string;
  readTime: number;
  topic: TopicKey | null;
  imageUrl: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  authorImage: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export interface BlogCardProps {
  data?: BlogCardData;
  variant?: "default" | "skeleton";
}

export function BlogCard({ data, variant = "default" }: BlogCardProps) {
  const isSkeleton = variant === "skeleton";

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link
        href={isSkeleton ? "#" : `/blogs/${data!.id}`}
        className="block w-full h-full"
      >
        <div className="relative h-48 w-full overflow-hidden">
          {isSkeleton ? (
            <div className="h-full w-full bg-gray-300 animate-pulse" />
          ) : (
            data?.imageUrl && (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${data.imageUrl}`}
                alt="Image for Blog"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )
          )}
        </div>

        <CardContent className="px-4 pt-4 pb-6">
          <h3 className="mb-2 text-lg font-semibold">
            {isSkeleton ? (
              <div className="h-6 w-3/4 bg-gray-300 animate-pulse" />
            ) : (
              data?.title
            )}
          </h3>

          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-2">
            {isSkeleton ? (
              <div className="h-4 w-20 bg-gray-300 animate-pulse" />
            ) : (
              <span>{data?.readTime} min read</span>
            )}

            {isSkeleton ? (
              <div className="mx-2 h-2 w-2 rounded-full bg-gray-300 animate-pulse" />
            ) : (
              <span className="mx-2">&bull;</span>
            )}

            {isSkeleton ? (
              <div className="h-6 w-24 bg-gray-300 animate-pulse rounded" />
            ) : (
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <BiSolidPurchaseTag />
                {data?.topic && TOPICS[data.topic]}
              </Badge>
            )}
          </div>

          <div className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 h-[3rem] leading-[1.5rem]">
            {isSkeleton ? (
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-300 animate-pulse" />
              </div>
            ) : (
              data?.content
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isSkeleton ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
                  <div className="h-4 w-24 bg-gray-300 animate-pulse" />
                </>
              ) : (
                <>
                  {data?.authorImage && (
                    <div className="relative size-8 overflow-hidden rounded-full">
                      <Image
                        src={data.authorImage}
                        alt={`${data.authorFirstName} ${data.authorLastName}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {data?.authorFirstName} {data?.authorLastName}
                  </p>
                </>
              )}
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
              {isSkeleton ? (
                <div className="h-4 w-24 bg-gray-300 animate-pulse" />
              ) : (
                data?.createdAt &&
                new Intl.DateTimeFormat("en-AU", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(data.createdAt))
              )}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
