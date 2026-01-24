import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { EducationCard } from "@/components/general/EducationCard";

async function getData() {
  return prisma.education.findMany({
    orderBy: {
      dateEnd: "desc",
    },
  });
}

export default async function EducationPage() {
  const { getPermission } = getKindeServerSession();
  const data = await getData();
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

      <div className="mx-auto max-w-3xl px-6 md:max-w-5xl">
        {data.map((item) => (
            <EducationCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
