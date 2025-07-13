import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogPostCardSkeleton() {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <Skeleton className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>

        <CardContent className="px-4 pt-4 pb-6 space-y-3">
          <Skeleton className="h-6 w-3/4 rounded" />

          <div className="flex mb-2">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-6 w-20 rounded-full" />              
          </div>

        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        </CardContent>
    </Card>
  );
}