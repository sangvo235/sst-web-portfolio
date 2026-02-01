"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryParam } from "@/hooks/useQueryParam";

type SortOption =
  | "createdAt-desc"
  | "createdAt-asc"
  | "title-asc"
  | "title-desc"
  | "readTime-asc"
  | "readTime-desc";

export function BlogFilter() {
  const { getParam, setParams } = useQueryParam();

  const topic = getParam("topic", "all");
  const sortBy = getParam("sortBy", "createdAt");
  const sort = getParam("sort", "desc");

  const sortOption = `${sortBy}-${sort}` as SortOption;

  function setSortOption(option: SortOption) {
    const [sortBy, sort] = option.split("-") as [string, string];

    setParams({
      topic: topic || "all",
      sortBy,
      sort,
    });
  }

  function setTopicOption(value: string) {
    setParams({
      topic: value,
      sortBy: sortBy || "createdAt",
      sort: sort || "desc",
    });
  }

  return (
    <div className="flex gap-4 pb-6">
      <Select value={topic} onValueChange={setTopicOption}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Topic" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="career">Career</SelectItem>
          <SelectItem value="education">Education</SelectItem>
          <SelectItem value="food-drink">Food & Drink</SelectItem>
          <SelectItem value="health-wellness">Health & Wellness</SelectItem>
          <SelectItem value="lifestyle">Lifestyle</SelectItem>
          <SelectItem value="technology">Technology</SelectItem>
          <SelectItem value="travel">Travel</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="createdAt-desc">Date (Newest)</SelectItem>
          <SelectItem value="createdAt-asc">Date (Oldest)</SelectItem>
          <SelectItem value="title-asc">Title (A → Z)</SelectItem>
          <SelectItem value="title-desc">Title (Z → A)</SelectItem>
          <SelectItem value="readTime-asc">Short Read</SelectItem>
          <SelectItem value="readTime-desc">Long Read</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
