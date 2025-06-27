import { Bio } from '@/components/general/Bio';
import { LatestBlogPosts } from '@/components/general/LatestBlogPosts'; 
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Home() {
  return (
    <div className="py-6 px-8"> 
      <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
        <Bio />
      </Suspense>

      <h1 className="text-3xl font-bold tracking-tight my-8">Latest Blog Posts</h1>

      <Suspense
        fallback={
          <div className="flex justify-center w-full">
            <div className="grid w-full max-w-screen-lg grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border shadow-sm overflow-hidden"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      >
        <LatestBlogPosts />
      </Suspense>
    </div>
  )
}