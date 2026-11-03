const zone = "Asia/Riyadh";

export const fmtDateTime = (d: Date | null | undefined) =>
  d ? new Intl.DateTimeFormat("en-GB", { timeZone: zone, day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).format(d) : "-";

export const fmtDate = (d: Date | null | undefined) =>
  d ? new Intl.DateTimeFormat("en-GB", { timeZone: zone, day: "2-digit", month: "short", year: "numeric" }).format(d) : "-";

/** Reads a string search param, ignoring arrays. */
export const param = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export const pageNumber = (value: string | string[] | undefined) => Math.max(1, Math.floor(Number(param(value))) || 1);
