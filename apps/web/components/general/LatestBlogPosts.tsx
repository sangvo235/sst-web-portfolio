import { prisma } from "@/app/utils/db";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorFirstName: true,
      authorLastName: true,
      id: true,
      createdAt: true,
    },
    take: 6,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

export async function LatestBlogPosts() {
    const data = await getData();

    return (
        <div className="flex justify-center w-full">
            <Carousel className="w-full max-w-screen-lg">
                <CarouselContent className="flex">
                    {data.map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <Link href={`/blogs/${item.id}`} className="block h-full">
                            <Card className="group overflow-hidden transition-all hover:shadow-lg">
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={item.imageUrl}
                                        alt="Image for blog"
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <CardContent className="px-4 pt-4 pb-6">                
                                    <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                                        {item.title}
                                    </CardTitle>
                                    <p className="mb-4 text-sm text-gray-600 line-clamp-2 h-[3rem] leading-[1.5rem]">
                                        {item.content}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                        
                                        <div className="relative size-8 overflow-hidden rounded-full">
                                            <Image
                                            src={item.authorImage}
                                            alt={`${item.authorFirstName} ${item.authorLastName}`}
                                            fill
                                            className="object-cover"
                                            />
                                        </div>

                                        <p className="text-sm font-medium text-gray-700">
                                            {item.authorFirstName} {item.authorLastName}
                                        </p>
                                        </div>

                                        <div className="text-sm text-gray-500">
                                        {new Intl.DateTimeFormat("en-au", {
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