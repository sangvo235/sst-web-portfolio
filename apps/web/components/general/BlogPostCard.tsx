import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { BiSolidPurchaseTag } from "react-icons/bi";

interface IappProps {
    data: {
        id: string;
        title: string;
        content: string;
        readTime: string;
        topic: string | null;
        imageUrl: string;
        authorId: string;
        authorFirstName: string;
        authorLastName: string;
        authorImage: string;
        createdAt: Date;
        updatedAt: Date;
    }
}

export function BlogPostCard({ data }: IappProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/blogs/${data.id}`} className="block w-full h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="Image for blog"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="px-4 pt-4 pb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {data.title}
          </h3>

          <div className="flex mb-2">
              <p className="text-sm text-gray-500">
                <span>{data.readTime} min read</span>
                <span className="mx-2">&bull;</span>
              </p>
              
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <BiSolidPurchaseTag />
                {data.topic}
              </Badge>
          </div>

          <p className="mb-4 text-sm text-gray-600 line-clamp-2 h-[3rem] leading-[1.5rem]">
            {data.content}
          </p>

          <div className="flex items-center justify-between">
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