import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProjectCardCombo from "@/components/cardsCombination/ProjectCardCombo";

export default async function ProjectPage() {
  const { getPermission } = getKindeServerSession();
  const requiredPermission = await getPermission("add:project");

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight my-4">
          {"Sang's Projects"}
        </h1>

        {requiredPermission?.isGranted && (
          <Link className={buttonVariants()} href="/projects/create">
            Create Project
          </Link>
        )}
      </div>

      <ProjectCardCombo />
    </>
  );
}
