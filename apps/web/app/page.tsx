import { Bio } from '@/components/general/Bio';
import { LatestBlogPosts } from '@/components/general/LatestBlogPost'; 
import { Suspense } from 'react';
import { BioSkeleton } from '@/components/skeleton/BioSkeleton';
import { LatestBlogPostSkeleton } from '@/components/skeleton/LatestBlogPostSkeleton';

export default async function Home() {
  return (
    <div className="py-6 px-8"> 
      <Suspense fallback={<BioSkeleton />}>
        <Bio />
      </Suspense>

      <h1 className="text-3xl font-bold tracking-tight my-8">Latest Blog Posts</h1>

      <Suspense fallback={<LatestBlogPostSkeleton />}>
        <LatestBlogPosts />
      </Suspense>
    </div>
  )
}