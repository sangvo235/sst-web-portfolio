import Link from "next/link";
import Image from 'next/image';
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

//TODO: MAKE INTO COMPONENT THEN ADD SKELETON & SUSPENSION!

async function getData() {
    const data = await prisma.education.findMany({
        orderBy: {
            dateEnd: 'desc',
        }
    })
    return data;
}

export default async function EducationPage() {
    const { getPermission } = getKindeServerSession();
    const data = await getData();
    const requiredPermission = await getPermission('add:education');

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
                    <div key={item.id} className="pb-6">
                        <div className="border border-gray-200 rounded-lg shadow-md w-full max-w-3xl mx-auto">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                <AccordionItem value={item.id.toString()}>
                                    <AccordionTrigger className="w-full px-4 py-3 text-left font-medium">
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={item.imageUrl}
                                                alt={`Image for ${item.name}`}
                                                width={96}
                                                height={96}
                                                className="rounded-full"
                                            />

                                            <div className="flex flex-col text-left">
                                                <span className="text-lg font-semibold text-gray-900">{item.title}</span>
                                                <span className="text-md font-semibold text-gray-700">{item.name}</span>
                                                <div className="text-sm text-gray-500">
                                                    {new Intl.DateTimeFormat("en-au", {
                                                    year: "numeric",
                                                    month: "short",
                                                    }).format(new Date(item.dateStart))}
                                                    {" - "}
                                                    {item.dateEnd
                                                    ? new Intl.DateTimeFormat("en-au", {
                                                        year: "numeric",
                                                        month: "short",
                                                        }).format(new Date(item.dateEnd))
                                                    : "Current"}
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="px-4 py-3 text-gray-700">
                                        <p className="mb-4 text-sm text-gray-600">{item.content}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}