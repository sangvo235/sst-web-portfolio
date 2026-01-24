export function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "short",
  }).format(date);
}

export function formatYearOnly(date: Date) {
  return new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
  }).format(date);
}
