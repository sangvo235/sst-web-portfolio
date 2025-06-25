import { FullBlogPost } from '@/components/general/FullBlogPost'; 

export default async function IdPage({ params }: { params: { id: string } }) {
  return (
        <FullBlogPost postId={params.id} />
    )
}