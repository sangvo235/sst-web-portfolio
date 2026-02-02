import Image from "next/image";
import { formatElapsedTime } from "@/app/utils/dateCalculate";
import { formatMonthYear } from "@/app/utils/dateFormat";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type ExperienceCardData = {
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
};

export interface ExperienceCardProps {
  data?: ExperienceCardData;
  variant?: "default" | "skeleton";
}

export function ExperienceCard({
  data,
  variant = "default",
}: ExperienceCardProps) {
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
            <AccordionTrigger className="w-full min-h-[120px] px-4 py-3">
              <div className="flex items-center gap-4">
                {isSkeleton ? (
                  <div className="w-24 h-24 rounded-full bg-gray-300 animate-pulse" />
                ) : (
                  data?.imageUrl && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${data.imageUrl}`}
                      alt={`Image for ${data.company}`}
                      width={96}
                      height={96}
                      className="rounded-full"
                    />
                  )
                )}

                <div className="flex flex-col text-left">
                  <span className="text-lg font-semibold text-black dark:text-white">
                    {isSkeleton ? (
                      <div className="h-6 w-72 bg-gray-300 animate-pulse rounded" />
                    ) : (
                      data?.title
                    )}
                  </span>

                  <div className="flex items-center text-md font-normal text-gray-700 dark:text-gray-200">
                    {isSkeleton ? (
                      <>
                        <div className="h-4 w-32 bg-gray-300 animate-pulse mt-1 rounded" />
                        <span className="mx-2">
                          <span className="inline-block h-1 w-1 rounded-full bg-gray-300 animate-pulse" />
                        </span>
                        <div className="h-4 w-24 bg-gray-300 animate-pulse mt-1 rounded" />
                      </>
                    ) : (
                      <>
                        <span>{data?.company}</span>
                        <span className="mx-2">•</span>
                        <span>{data?.type}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center text-md font-normal text-gray-500 dark:text-gray-400">
                    {isSkeleton ? (
                      <>
                        <div className="inline-block h-4 w-28 bg-gray-300 animate-pulse mt-1 rounded" />
                        <span className="mx-2">
                          <span className="inline-block h-1 w-1 rounded-full bg-gray-300 animate-pulse" />
                        </span>
                        <div className="inline-block h-4 w-24 bg-gray-300 animate-pulse mt-1 rounded" />
                      </>
                    ) : data?.dateStart ? (
                      <>
                        <span>
                          {formatMonthYear(new Date(data.dateStart))} -{" "}
                          {data.dateEnd
                            ? formatMonthYear(new Date(data.dateEnd))
                            : "Present"}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          {formatElapsedTime(
                            new Date(data.dateStart),
                            data.dateEnd ? new Date(data.dateEnd) : undefined,
                          )}
                        </span>
                      </>
                    ) : (
                      "Date unavailable"
                    )}
                  </div>

                  <span className="text-md font-normal text-gray-500 dark:text-gray-400">
                    {isSkeleton ? (
                      <div className="h-4 w-40 bg-gray-300 animate-pulse mt-1 rounded" />
                    ) : (
                      data?.location
                    )}
                  </span>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="whitespace-pre-line">
              {isSkeleton ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-300 animate-pulse rounded" />
                    <div className="h-4 w-5/6 bg-gray-300 animate-pulse rounded" />
                    <div className="h-4 w-2/3 bg-gray-300 animate-pulse rounded" />
                  </div>

                  <div className="flex flex-col items-center mb-4 text-gray-900 dark:text-white">
                    <div className="h-4 w-24 bg-gray-300 animate-pulse rounded" />
                    <div className="flex flex-wrap justify-center gap-2 mt-3">
                      <div className="h-8 w-20 bg-gray-300 animate-pulse rounded-full" />
                      <div className="h-8 w-20 bg-gray-300 animate-pulse rounded-full" />
                      <div className="h-8 w-20 bg-gray-300 animate-pulse rounded-full" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mb-4 text-sm text-black dark:text-gray-100">
                    {data?.content}
                  </p>

                  <div className="flex flex-col items-center text-gray-900 dark:text-white">
                    <Label className="mb-2">Skills</Label>

                    {data?.skills && data?.skills.length > 0 ? (
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
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        No skills listed
                      </p>
                    )}
                  </div>
                </>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
