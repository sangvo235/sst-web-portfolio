"use client";

import { useFetch } from "@/hooks/useFetch";
import {
  ExperienceCard,
  ExperienceCardData,
} from "@/components/cards/ExperienceCard";

export default function EducationCardCombo() {
  const { data: education, loading } =
    useFetch<ExperienceCardData[]>("/api/experience");

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-6">
        {Array.from({ length: 3 }).map((_, idx) => (
          <ExperienceCard key={idx} variant="skeleton" />
        ))}
      </div>
    );
  }

  if (!education?.length) {
    return (
      <p className="col-start-2 col-span-4 text-gray-500 italic">
        No experience details found.
      </p>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6">
      {education.map((item) => (
        <ExperienceCard key={item.id} data={item} />
      ))}
    </div>
  );
}
