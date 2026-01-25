"use client";

import { useEffect, useState } from "react";

export function useDelayedFetch<T>(
  url: string,
  delay = 2000, // 2 seconds
  transform?: (data: any) => T
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await new Promise((r) => setTimeout(r, delay));

      const res = await fetch(url);
      const json = await res.json();

      setData(transform ? transform(json) : json);
      setLoading(false);
    }

    fetchData();
  }, [url, delay, transform]);

  return { data, loading };
}
