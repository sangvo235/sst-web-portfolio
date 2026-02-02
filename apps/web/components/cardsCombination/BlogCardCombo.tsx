"use client";

import { useSearchParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import { BlogCard, BlogCardData } from "@/components/cards/BlogCard";

export default function BlogCardCombo() {
  const searchParams = useSearchParams();

  const topic = searchParams.get("topic") || "all";
  const sort = searchParams.get("sort") || "desc";
  const sortBy = searchParams.get("sortBy") || "createdAt";

  const url = `/api/blogs?topic=${topic}&sort=${sort}&sortBy=${sortBy}`;

  const { data: blogs, loading } = useFetch<BlogCardData[]>(url);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <BlogCard key={idx} variant="skeleton" />
        ))}
      </div>
    );
  }

  if (!blogs?.length) {
    return (
      <p className="col-start-2 col-span-4 text-gray-500 italic">
        No blog posts found yet. Check back soon...
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map((item) => (
        <BlogCard key={item.id} data={item} />
      ))}
    </div>
  );
}
