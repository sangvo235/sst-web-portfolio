export function getElapsedTime(start: Date, end: Date = new Date()) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
}

export function formatElapsedTime(start: Date, end?: Date) {
  const { years, months } = getElapsedTime(start, end);

  if (years === 0 && months === 0) return "1 mos";

  const yearPart =
    years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";

  const monthPart =
    months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "";

  return [yearPart, monthPart].filter(Boolean).join(" ");
}
