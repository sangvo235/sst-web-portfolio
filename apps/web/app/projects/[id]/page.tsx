import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ProjectPost } from "@/components/general/ProjectPost";
import { PostSkeleton } from "@/components/skeleton/PostSkeleton";

export default async function ProjectPageDynamic({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isAuthenticated, getPermission } = getKindeServerSession();

  if (!isAuthenticated()) {
    redirect("/api/auth/register");
  }

  const permission = await getPermission("comment:project");

  const { id } = await params;

  return (
    <Suspense fallback={<PostSkeleton />}>
      <ProjectPost id={id} canComment={!!permission?.isGranted} />
    </Suspense>
  );
}
