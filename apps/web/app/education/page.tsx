import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import EducationCardCombo from "@/components/cardsCombination/EducationCardCombo";

export default async function EducationPage() {
  const { getPermission } = getKindeServerSession();
  const requiredPermission = await getPermission("add:education");

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold tracking-tight my-4">Education</h1>

        {requiredPermission?.isGranted && (
          <Link className={buttonVariants()} href="/education/create">
            Create Education
          </Link>
        )}
      </div>
        <div className="col-span-full">

      <EducationCardCombo />
        </div>
    </div>
  );
}
