import { prisma } from "@/app/utils/db";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function getData() {
  const data = await prisma.blogs.findMany({
    select: {
      title: true,
      imageUrl: true,
      topic: true,
      readTime: true,
      content: true,
      authorImage: true,
      authorFirstName: true,
      authorLastName: true,
      id: true,
      createdAt: true,
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export async function LatestBlogPosts() {
  const data = await getData();

  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 italic">
        No blog posts found yet. Check back soon...
      </p>
    );
  }

  return (
    <div className="flex justify-center w-full px-12">
      <Carousel className="w-full max-w-screen-lg">
        <CarouselContent className="flex">
          {data.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/blogs/${item.id}`} className="block h-full">
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${item.imageUrl}`}
                      alt="Image for Blog"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="px-4 pb-6">
                    <CardTitle className="text-lg font-semibold mb-2">
                      {item.title}
                    </CardTitle>

                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-2">
                      <span>{item.readTime} min read</span>

                      <span className="mx-2">&bull;</span>

                      <Badge
                        variant="secondary"
                        className="bg-blue-500 text-white dark:bg-blue-600"
                      >
                        <BiSolidPurchaseTag />
                        {item.topic}
                      </Badge>
                    </div>

                    <div className="mb-4 text-sm text-gray-600 dark:text-gray-300 line-clamp-2 h-[3rem] leading-[1.5rem]">
                      {item.content}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={item.authorImage}
                            alt={`${item.authorFirstName} ${item.authorLastName}`}
                          />
                          <AvatarFallback>
                            {item.authorFirstName?.[0]}
                            {item.authorLastName?.[0]}
                          </AvatarFallback>
                        </Avatar>

                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {item.authorFirstName} {item.authorLastName}
                        </p>
                      </div>

                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Intl.DateTimeFormat("en-AU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }).format(item.createdAt)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
