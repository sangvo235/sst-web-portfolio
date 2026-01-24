"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useQueryParam() {
  const router = useRouter();
  const params = useSearchParams();

  // Update one param
  function setParam(key: string, value: string) {
    const q = new URLSearchParams(params);
    value === "all" ? q.delete(key) : q.set(key, value);
    router.replace(`?${q.toString()}`);
  }

  // Update multiple params at once
  // eg. A record could be --> topic: "technology", sort: "asc", sortBy: "createdAt"
  function setParams(newParams: Record<string, string>) {
    const q = new URLSearchParams(params);

    for (const [key, value] of Object.entries(newParams)) {
      value === "all" ? q.delete(key) : q.set(key, value);
    }

    router.replace(`?${q.toString()}`);
  }

  function getParam(key: string, fallback?: string) {
    return params.get(key) ?? fallback;
  }

  return { setParam, setParams, getParam };
}
