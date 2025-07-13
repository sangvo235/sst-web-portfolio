import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export function ProjectCardSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, num) => (
      <Card key={num} className="group overflow-hidden transition-all hover:shadow-lg">
          <div className="relative h-48 w-full overflow-hidden">
            <Skeleton className="object-cover transition-transform duration-300 group-hover:scale-105" />
          </div>

          <CardContent className="px-4 pt-4 pb-6">
            <div className="space-y-2 pb-6">
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
            </div>

            <div className="w-full overflow-hidden">
              <div className="mx-auto flex max-w-fit items-center justify-center gap-2 py-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-4 w-16 rounded"
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
              <Skeleton className="h-4 w-16 rounded" />
            </div>
          </CardContent>
      </Card>
      ))}
    </>
  );
}