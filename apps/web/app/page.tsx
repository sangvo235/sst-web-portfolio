import { Bio } from '@/components/general/Bio';
import { LatestBlogPosts } from '@/components/general/LatestBlogPosts'; 

export default async function Home() {
  return (
    <div className="py-6"> 
      <Bio />
      <h1 className="text-3xl font-bold tracking-tight my-8">Latest Blog Posts</h1>
      <LatestBlogPosts />
    </div>
  )
}