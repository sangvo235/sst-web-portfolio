export function getElapsedTime(
    start?: Date | string | null,
    end?: Date | string | null
  ) {
    
    if (!start) return null;

    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return null;
    }

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
}

export function formatElapsedTime(
    start?: Date | string | null,
    end?: Date | string | null
  ) {
  
    const elapsed = getElapsedTime(start, end);
    if (!elapsed) return "";

    const { years, months } = elapsed;
    if (years === 0 && months === 0) return "Less than 1 mo";
    const yearPart = years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "";
    const monthPart = months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "";

    return [yearPart, monthPart].filter(Boolean).join(" ");
}
