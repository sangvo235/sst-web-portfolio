"use client";

import { BlogCard } from "../cards/BlogCard";

export default function BlogCardComboSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <BlogCard key={idx} variant="skeleton" />
      ))}
    </div>
  );
}
