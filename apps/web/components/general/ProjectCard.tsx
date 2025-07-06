import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ProjectCardProps {
    data: {
        id: string;
        title: string;
        description: string;
        imageUrl: string;
        githubUrl: string;
        demoUrl: string;
        authorId: string;
        authorFirstName: string;
        authorLastName: string;
        authorImage: string;
        createdAt: Date;
        updatedAt: Date;
        techIconUrls: string[];
    }
}

export function ProjectCard({ data }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/projects/${data.id}`} className="block w-full h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="Image for Project"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="px-4 pt-4 pb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {data.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-3 h-[4rem] leading-[1.5rem]">
          {data.description}
          </p>

          <div className="w-full overflow-hidden">
            <div className="mx-auto flex max-w-fit items-center justify-center gap-2 py-4">
            {data.techIconUrls.slice(0, 9).map((iconUrl, idx) => (
              <div key={idx} className="flex-none w-8 h-8 relative">
                <Image
                  src={iconUrl}
                  alt={`tech icon ${idx + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="relative size-8 overflow-hidden rounded-full">
                  <Image
                  src={data.authorImage}
                  alt={`${data.authorFirstName} ${data.authorLastName}`}
                  fill
                  className="object-cover"
                  />
              </div>
              <p className="text-sm font-medium text-gray-700">
                  {data.authorFirstName} {data.authorLastName}
              </p>
            </div>

            <div className="text-sm text-gray-500 whitespace-nowrap">
            {new Intl.DateTimeFormat("en-au", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }).format(data.createdAt)}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}