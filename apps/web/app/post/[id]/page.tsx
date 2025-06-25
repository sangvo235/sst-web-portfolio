import { prisma } from "@/app/utils/db";
import { notFound } from "next/navigation"
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { BiComment } from "react-icons/bi";

async function getData(id: string) {
    const data = await prisma.blogPost.findUnique({
        where: {
            id: id,
        }
    });

    if(!data) {
        return notFound();
    }

    return data;
}

type Params = Promise<{id: string}>;

export default async function IdPage({ params }: { params: Params }) {
    const { id } = await params; 
    const data = await getData(id);

    // TODO: CURRENTLY MOCK DATA - ADD COMMENT MODEL TO DB
    const comment = {
        authorImage: "https://media.myswitzerland.com/image/fetch/w_2160,h_800,c_limit,f_auto,q_auto,e_sharpen:50/https%3A%2F%2Fwww.myswitzerland.com%2F-%2Fmedia%2Fcelum%20connect%2F2023%2F07%2F13%2F13%2F44%2F45%2Fzermatt-grindjisee.jpg",
        authorName: "Jane Doe",
        createdAt: "2030-01-01T13:00:00Z",
        text: "Wow Sang!! This is amazing you should be promoted to intern!",
    };

    return (
      <div className="grid grid-cols-6 gap-4">

          <div className="col-span-6 pt-4 pl-8">
              <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/blogs"
              >
              Back to posts
              </Link>
          </div>

          <div className="col-start-2 col-span-4 py-2 text-5xl font-bold">
              {data.title}
          </div>

          <div className="col-start-2 col-span-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <div className="relative size-8 overflow-hidden rounded-full">
                      <Image
                      src={data.authorImage}
                      alt={data.authorName}
                      fill
                      className="object-cover"
                      />
                  </div>

                  <p className="text-md font-medium text-gray-700">
                      {data.authorName}
                  </p>

                  <p className="text-md text-gray-500 flex items-center">
                      {/* TODO: minute suggestion add to db */}
                      <span>2 min read</span>
                      <span className="mx-2">&bull;</span>
                      <span>
                          {new Intl.DateTimeFormat("en-AU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          }).format(new Date(data.createdAt))}
                      </span>
                      {/* TODO: SEARCH comments # and link to comment section below */}
                      <span className="mx-2">&bull;</span>
                      <Link href="/blogs" className="flex items-center gap-2" aria-label="View comments">
                          2 <BiComment className="text-md"/>
                      </Link>
                  </p>
              </div>
          </div>

          <div className="col-start-2 col-span-4 relative h-96 w-full overflow-hidden">
              <Image
                  src={data.imageUrl}
                  alt="Image for blog"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
          </div>

          <p className="col-start-2 col-span-4 text-md text-gray-600 py-4">
              {data.content}
          </p>

          <p className="col-start-2 col-span-4 text-xl font-semibold py-2">
              Comments
          </p>

          <div className="col-start-2 col-span-4 py-4 px-6">
              <Card className="p-4">
                  <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <div className="relative size-8 overflow-hidden rounded-full">
                              <Image
                                  src={comment.authorImage}
                                  alt={comment.authorName}
                                  fill
                                  className="object-cover"
                              />
                              </div>
                              <p className="text-sm font-medium text-gray-700">
                              {comment.authorName}
                              </p>
                          </div>

                          <div className="text-sm text-gray-500">
                              {new Intl.DateTimeFormat("en-au", {
                                  minute: "2-digit",
                                  hour: "numeric",
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                              }).format(new Date(comment.createdAt))}
                          </div>
                      </div>
                  </CardHeader>

                  <CardContent>
                      <p className="text-sm text-gray-800 pl-8">{comment.text}</p>
                  </CardContent>
                  <CardFooter />
              </Card>
          </div>
      </div>
    )
}