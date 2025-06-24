import { prisma } from "./utils/db";
import { Bio } from '@/components/general/Bio';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Image from "next/image";

async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
    },
    take: 6,
  });

  return data;
}

{/* <div className="grid grid-cols-1 md:grid-cols-2 lg: grid-cols-3 gap-4"> 

</div> */}

export default async function Home() {
  const data = await getData();
  return (
    <div className="py-6"> 
      <Bio />
      <h1 className="text-3xl font-bold tracking-tight my-8">Latest Blog Posts</h1>

      <div className="flex justify-center w-full">
        <Carousel className="w-full max-w-screen-lg center-item">
          <CarouselContent className="flex">
            {data.map((item, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image 
                            src={item.imageUrl} 
                            alt="Image for blog"
                            fill
                            // className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <CardTitle className="px-4">{item.title}</CardTitle>
                    <p className="mb-2 px-4 text-sm text-gray-600 line-clamp-2">{item.content}</p>
                    <div className="flex items-center justify-between mb-2 px-4">
                        <div className="flex items-center gap-2">
                            <div className="relative size-8 overflow-hidden rounded-full">
                                <Image src={item.authorImage} alt="data.authorName" fill className="object-cover" />
                            </div>
                            <p className="text-sm font-medium text-gray-700">{item.authorName}</p>
                        </div>

                        <div className="text-sm text-gray-500">
                            {new Intl.DateTimeFormat('en-au', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                            }).format(item.createdAt)}
                        </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
