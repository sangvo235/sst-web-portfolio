import { FullBlogPost } from '@/components/general/FullBlogPost'; 
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function IdPage({ params }: { params: { id: string } }) {
  return (
      <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
        <FullBlogPost postId={params.id} />
      </Suspense>
    )
}