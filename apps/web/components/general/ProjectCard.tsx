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

        createdAt: Date;
        updatedAt: Date;

        techIconUrls: string[];
    }
}

export function ProjectCard({ data }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/blogs/${data.id}`} className="block w-full h-full">
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

          <p className="mb-4 text-sm text-gray-600 line-clamp-2 h-[3rem] leading-[1.5rem]">
            {data.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <div className="relative size-8 overflow-hidden rounded-full">
                <Image
                  src={data.authorImage}
                  alt={`${data.authorFirstName} ${data.authorLastName}`}
                  fill
                  className="object-cover"
                />
              </div> */}
              {/* <div> */}
                {/* <a href={`{data.githubUrl}`}>
                    Github Link
                </a>
                <a href={`{data.demoUrl}`}>
                    Demo Link
                </a> */}
              {/* </div> */}
              
          {data.techIconUrls && data.techIconUrls.length > 0 && (
            <div className="flex gap-2">
              {data.techIconUrls.map((iconUrl, idx) => (
                <div key={idx} className="relative w-6 h-6">
                  <Image
                    src={iconUrl}
                    alt={`tech icon ${idx + 1} for Project`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          )}

            </div>

            <div className="text-sm text-gray-500">
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