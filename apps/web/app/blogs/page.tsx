import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogFilter } from "@/components/general/BlogFilter";
import BlogCardCombo from "@/components/cardsCombination/BlogCardCombo";
import BlogCardComboSkeleton from "@/components/skeleton/BlogCardComboSkeleton";
import BlogFilterSkeleton from "@/components/skeleton/BlogFilterSkeleton";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const { getPermission } = getKindeServerSession();
  const requiredPermission = await getPermission("add:blog");

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight my-4">
          Sang's Blog Posts
        </h1>

        {requiredPermission?.isGranted && (
          <Link className={buttonVariants()} href="/blogs/create">
            Create Blog Post
          </Link>
        )}
      </div>

      <Suspense fallback={<BlogFilterSkeleton />}>
        <BlogFilter />
      </Suspense>

      <Suspense fallback={<BlogCardComboSkeleton />}>
        <BlogCardCombo />
      </Suspense>
    </>
  );
}
