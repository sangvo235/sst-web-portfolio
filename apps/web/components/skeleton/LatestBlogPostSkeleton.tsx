import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Skeleton } from "@/components/ui/skeleton";

export function LatestBlogPostSkeleton() {
  return (
    <div className="flex justify-center w-full px-12">
      <Carousel className="w-full max-w-screen-lg">
        <CarouselContent className="flex">
          {[...Array(3)].map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 w-full overflow-hidden">
                  <Skeleton className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>

                <CardContent className="px-4 pt-4 pb-6 space-y-3">
                  <Skeleton className="h-6 w-3/4 rounded" />

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-8 rounded-full" />
                      <Skeleton className="h-4 w-24 rounded" />
                    </div>
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
