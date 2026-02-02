import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatYearOnly } from "@/app/utils/dateFormat";

export type EducationCardData = {
  id: string;
  title: string;
  name: string;
  imageUrl: string;
  dateStart: Date | string;
  dateEnd?: Date | string | null;
  content: string;
};

export interface EducationCardProps {
  data?: EducationCardData;
  variant?: "default" | "skeleton";
}

export function EducationCard({
  data,
  variant = "default",
}: EducationCardProps) {
  const isSkeleton = variant === "skeleton";

  return (
    <div className="pb-6">
      <div className="border border-gray-200 rounded-lg shadow-md w-full max-w-5xl mx-auto dark:border-gray-700">
        <Accordion
          type="single"
          collapsible
          defaultValue={undefined}
          className="w-full"
        >
          <AccordionItem value={data?.id?.toString() ?? "item"}>
            <AccordionTrigger className="w-full min-h-[120px]">
              <div className="flex items-center gap-4">
                {isSkeleton ? (
                  <div className="w-24 h-24 rounded-full bg-gray-300 animate-pulse" />
                ) : (
                  data?.imageUrl && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${data.imageUrl}`}
                      alt={`Image for ${data.name}`}
                      width={96}
                      height={96}
                      className="rounded-full"
                    />
                  )
                )}

                <div className="flex flex-col text-left">
                  <span className="text-lg font-semibold text-black dark:text-white">
                    {isSkeleton ? (
                      <div className="h-6 w-40 bg-gray-300 animate-pulse rounded" />
                    ) : (
                      data?.title
                    )}
                  </span>

                  <span className="text-md font-normal text-gray-700 dark:text-gray-200">
                    {isSkeleton ? (
                      <div className="h-5 w-32 bg-gray-300 animate-pulse mt-1 rounded" />
                    ) : (
                      data?.name
                    )}
                  </span>

                  <div className="text-md font-normal text-gray-500 dark:text-gray-400">
                    {isSkeleton ? (
                      <span className="inline-block h-4 w-28 bg-gray-300 animate-pulse mt-1 rounded" />
                    ) : data?.dateStart ? (
                      <>
                        {formatYearOnly(new Date(data.dateStart))} {" - "}
                        {data.dateEnd
                          ? formatYearOnly(new Date(data.dateEnd))
                          : "Present"}
                      </>
                    ) : (
                      "Date unavailable"
                    )}
                  </div>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="whitespace-pre-line">
              {isSkeleton ? (
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-300 animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-gray-300 animate-pulse rounded" />
                  <div className="h-4 w-2/3 bg-gray-300 animate-pulse rounded" />
                </div>
              ) : (
                <p className="text-sm text-black dark:text-gray-100">
                  {data?.content}
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
