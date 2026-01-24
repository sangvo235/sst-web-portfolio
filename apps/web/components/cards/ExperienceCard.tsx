import Image from 'next/image';
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

interface ExperienceCardProps {
    data: {
        id: string;
        title: string;
        company: string;
        type: string;
        imageUrl: string;
        dateStart: Date | string;
        dateEnd?: Date | string | null;
        location: string;
        content: string;
        skills: string[];
    }
}

export function ExperienceCard({ data }: ExperienceCardProps) {
    return (
        <div className="pb-6">
            <div className="mx-auto max-w-3xl px-6 md:max-w-5xl">
                <div key={data.id} className="pb-6">
                    <div className="border border-gray-200 rounded-lg shadow-md w-full max-w-3xl mx-auto">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                        >
                            <AccordionItem value={data.id.toString()}>
                                <AccordionTrigger className="w-full px-4 py-3 text-left font-medium">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src={data.imageUrl}
                                            alt={`Image for ${data.company}`}
                                            width={96}
                                            height={96}
                                            className="rounded-full"
                                        />

                                        <div className="flex flex-col text-left">
                                            <span className="text-lg font-semibold text-gray-900">{data.title}</span>

                                            <div className="flex items-center text-md font-normal text-gray-700">
                                                <span>{data.company}</span>
                                                <span className="mx-2">•</span>
                                                <span>{data.type}</span>
                                            </div>

                                            <div className="flex items-center text-md font-normal text-gray-500">
                                                <span>
                                                    {formatMonthYear(new Date(data.dateStart))} - {data.dateEnd ? formatMonthYear(new Date(data.dateEnd)) : "Present"}
                                                </span>
                                                <span className="mx-2">•</span>                
                                                <span>
                                                    {formatElapsedTime(
                                                    new Date(data.dateStart),
                                                    data.dateEnd ? new Date(data.dateEnd) : undefined
                                                    )}
                                                </span>
                                            </div>

                                            <span className="text-md font-normal text-gray-500">{data.location}</span>
                                        </div>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent className="px-4 py-3 text-gray-700">
                                    <p className="mb-4 text-sm">{data.content}</p>

                                    <div className="flex flex-col items-center mb-4 text-gray-900">
                                        <Label className="mb-2">Skills</Label>

                                        {data.skills && data.skills.length > 0 ? (
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {data.skills.map((skill, idx) => (
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
            </div>
        </div>
    );
}
