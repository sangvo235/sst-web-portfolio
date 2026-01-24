import Link from "next/link";
import Image from 'next/image';
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { formatElapsedTime } from "@/app/utils/dateCalculate";
import { formatMonthYear } from "@/app/utils/dateFormat";

//TODO: MAKE INTO COMPONENT THEN ADD SKELETON & SUSPENSION!

async function getData() {
    const data = await prisma.experience.findMany({
        orderBy: {
            dateEnd: 'desc',
        },
    })
    return data;
}

export default async function ExperiencePage() {
    const { getPermission } = getKindeServerSession();
    const data = await getData();
    const requiredPermission = await getPermission('add:experience');

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold tracking-tight my-4">Experience</h1>

                {requiredPermission?.isGranted && (
                    <Link className={buttonVariants()} href="/experience/create">
                    Create Experience
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
                                                alt={`Image for ${item.company}`}
                                                width={96}
                                                height={96}
                                                className="rounded-full"
                                            />

                                            <div className="flex flex-col text-left">
                                                <span className="text-lg font-semibold text-gray-900">{item.title}</span>

                                                <div className="flex items-center text-md font-normal text-gray-700">
                                                    <span>{item.company}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{item.type}</span>
                                                </div>

                                                <div className="flex items-center text-md font-normal text-gray-500">
                                                    <span>
                                                        {formatMonthYear(new Date(item.dateStart))} - {item.dateEnd ? formatMonthYear(new Date(item.dateEnd)) : "Present"}
                                                    </span>
                                                    <span className="mx-2">•</span>                
                                                    <span>
                                                        {formatElapsedTime(
                                                        new Date(item.dateStart),
                                                        item.dateEnd ? new Date(item.dateEnd) : undefined
                                                        )}
                                                    </span>
                                                </div>

                                                <span className="text-md font-normal text-gray-500">{item.location}</span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="px-4 py-3 text-gray-700">
                                        <p className="mb-4 text-sm">{item.content}</p>

                                        <div className="flex flex-col items-center mb-4 text-gray-900">
                                            <Label className="mb-2">Skills</Label>

                                            {item.skills && item.skills.length > 0 ? (
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    {item.skills.map((skill, idx) => (
                                                        <Badge
                                                        key={idx}
                                                        variant="secondary"
                                                        className="bg-blue-500 text-white dark:bg-blue-600"
                                                        >
                                                        {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 italic">No skills listed</p>
                                            )
                                            }
                                        </div>
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