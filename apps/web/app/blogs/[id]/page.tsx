import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPost } from "@/components/general/BlogPost";
import { PostSkeleton } from "@/components/skeleton/PostSkeleton";

export default async function BlogPageDynamic({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isAuthenticated, getPermission } = getKindeServerSession();

  if (!isAuthenticated()) {
    redirect("/api/auth/register");
  }

  const permission = await getPermission("comment:blog");

  const { id } = await params;

  return (
    <Suspense fallback={<PostSkeleton />}>
      <BlogPost id={id} canComment={!!permission?.isGranted} />
    </Suspense>
  );
}
