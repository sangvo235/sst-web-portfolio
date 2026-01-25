"use client";

import { EducationCard, EducationCardData } from "@/components/cards/EducationCard";
import { useFetch } from "@/hooks/useFetch";

export default function EducationCardCombo() {
    const { data: education, loading } = useFetch<EducationCardData[]>("/api/education");
    console.log("Education data fetched:", education);

    if (loading) {
        return (
            <div className="mx-auto w-full max-w-7xl px-6">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <EducationCard key={idx} variant="skeleton" />
                ))}
            </div>
        );
    }

    if (!education?.length) {
        return (
            <p className="col-start-2 col-span-4 text-gray-500 italic">
                No education details found.
            </p>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-6">
            {education.map((item) => (
                <EducationCard key={item.id} data={item} />
            ))}
        </div>
    );
}
