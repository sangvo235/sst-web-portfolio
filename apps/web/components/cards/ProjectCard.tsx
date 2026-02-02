import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type ProjectCardData = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  githubUrl: string;
  readTime: number;
  demoUrl: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  authorImage: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  techIconUrls: string[];
};

export interface ProjectCardProps {
  data?: ProjectCardData;
  variant?: "default" | "skeleton";
}

export function ProjectCard({ data, variant = "default" }: ProjectCardProps) {
  const isSkeleton = variant === "skeleton";

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link
        href={isSkeleton ? "#" : `/projects/${data?.id}`}
        className="block w-full h-full"
      >
        <div className="relative h-48 w-full overflow-hidden">
          {isSkeleton ? (
            <div className="h-full w-full bg-gray-300 animate-pulse" />
          ) : (
            data?.imageUrl && (
              <Image
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${data.imageUrl}`}
                alt="Image for Project"
                fill
                className="object-scale-down transition-transform duration-300 group-hover:scale-105"
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
          </div>

          <div className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 h-[3rem] leading-[1.5rem]">
            {isSkeleton ? (
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300 animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-300 animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-300 animate-pulse" />
              </div>
            ) : (
              data?.content
            )}
          </div>

          <div className="w-full overflow-hidden">
            <div className="mx-auto flex max-w-fit items-center justify-center gap-2 pb-4">
              {isSkeleton
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"
                    />
                  ))
                : data?.techIconUrls?.slice(0, 9).map((f, i) => (
                    <div key={i} className="flex-none w-8 h-8 relative">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${f}`}
                        alt={`tech icon: ${f}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              {isSkeleton ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
                  <div className="h-4 w-20 bg-gray-300 animate-pulse" />
                </>
              ) : (
                <>
                  <Avatar>
                    {data?.authorImage ? (
                      <AvatarImage
                        src={data.authorImage}
                        alt={`${data.authorFirstName} ${data.authorLastName}`}
                      />
                    ) : (
                      <AvatarFallback>
                        {data?.authorFirstName?.[0]}
                        {data?.authorLastName?.[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>

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
