import { Bio } from '@/components/general/Bio';
import { LatestBlogPosts } from '@/components/general/LatestBlogPost'; 
import { LatestBlogPostSkeleton } from '@/components/skeleton/LatestBlogPostSkeleton';
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
          <LatestBlogPostSkeleton />
        }
      >
        <LatestBlogPosts />
      </Suspense>
    </div>
  )
}