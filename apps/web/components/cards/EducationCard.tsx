import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatYearOnly } from "@/app/utils/dateFormat";

interface EducationCardProps {
    data: {
        id: string;
        title: string;
        name: string;
        imageUrl: string;
        dateStart: Date | string;
        dateEnd?: Date | string | null;
        content: string;
    }
}

export function EducationCard({ data }: EducationCardProps) {
    return (
        <div className="pb-6">
            <div className="border border-gray-200 rounded-lg shadow-md w-full max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={data.id.toString()}>
                    <AccordionTrigger className="w-full px-4 py-3 text-left font-medium">
                        <div className="flex items-center gap-4">
                        <Image
                            src={data.imageUrl}
                            alt={`Image for ${data.name}`}
                            width={96}
                            height={96}
                            className="rounded-full"
                        />

                        <div className="flex flex-col text-left">
                            <span className="text-lg font-semibold text-gray-900">
                            {data.title}
                            </span>
                            <span className="text-md font-normal text-gray-700">
                            {data.name}
                            </span>
                            <div className="text-md font-normal text-gray-500">
                            {formatYearOnly(new Date(data.dateStart))} -{" "}
                            {data.dateEnd
                                ? formatYearOnly(new Date(data.dateEnd))
                                : "Present"}
                            </div>
                        </div>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-4 py-3 text-gray-700">
                        <p className="mb-4 text-sm">{data.content}</p>
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
