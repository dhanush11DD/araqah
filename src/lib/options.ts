import "server-only";
import { getDb } from "./db";
import type { Locale } from "./requests";

export const OPTION_KINDS = ["service", "profession", "nationality"] as const;
export type OptionKind = (typeof OPTION_KINDS)[number];

export const KIND_TITLES: Record<OptionKind, { title: string; field: string; hint: string }> = {
  service: { title: "Service types", field: "Service type", hint: "Choices in the “Service type” dropdown of the Request a worker form." },
  profession: { title: "Professions", field: "Required profession", hint: "Choices in the “Required profession” dropdown." },
  nationality: { title: "Nationalities", field: "Required nationality", hint: "Choices in the “Required nationality” dropdown." },
};

export type FormOption = { id: number; kind: OptionKind; code: string; nameEn: string; nameAr: string; sortOrder: number; isActive: boolean };

// The first set is exactly what the approved design shows, so a fresh install renders identically.
const DEFAULTS: Record<OptionKind, [string, string, string][]> = {
  service: [
    ["recruitment", "Worker Recruitment", "استقدام العمالة"],
    ["transfer", "Worker Transfer", "نقل الخدمات"],
    ["maarofa", "Named Worker (Maarofa)", "خدمة «معروفة»"],
    ["contract", "Contract Authentication", "توثيق العقود"],
  ],
  profession: [
    ["housemaid", "Housemaid", "عاملة منزلية"],
    ["male_worker", "Male Domestic Worker", "عامل منزلي"],
    ["driver", "Private Driver", "سائق خاص"],
    ["nanny", "Nanny", "مربية أطفال"],
    ["caregiver", "Caregiver", "مقدّمة رعاية"],
    ["cook", "Cook", "طبّاخ / طبّاخة"],
    ["special_needs", "Special Needs Caregiver", "رعاية ذوي الاحتياجات الخاصة"],
  ],
  nationality: [
    ["PH", "Philippines", "الفلبين"],
    ["ID", "Indonesia", "إندونيسيا"],
    ["LK", "Sri Lanka", "سريلانكا"],
    ["IN", "India", "الهند"],
    ["NP", "Nepal", "نيبال"],
    ["BD", "Bangladesh", "بنغلاديش"],
    ["KE", "Kenya", "كينيا"],
    ["UG", "Uganda", "أوغندا"],
    ["ET", "Ethiopia", "إثيوبيا"],
    ["GH", "Ghana", "غانا"],
  ],
};

const toOption = (r: Record<string, unknown>): FormOption => ({
  id: Number(r.id),
  kind: r.kind as OptionKind,
  code: String(r.code),
  nameEn: String(r.name_en),
  nameAr: String(r.name_ar),
  sortOrder: Number(r.sort_order),
  isActive: Number(r.is_active) === 1,
});

async function seed() {
  const db = await getDb();
  const count = Number((await db.get("SELECT COUNT(*) AS c FROM form_options"))?.c ?? 0);
  if (count > 0) return;
  for (const kind of OPTION_KINDS) {
    let order = 0;
    for (const [code, en, ar] of DEFAULTS[kind]) {
      await db.run("INSERT INTO form_options (kind, code, name_en, name_ar, sort_order, is_active) VALUES (?, ?, ?, ?, ?, 1)", [kind, code, en, ar, ++order]);
    }
  }
}

export async function listOptions(kind?: OptionKind, activeOnly = false): Promise<FormOption[]> {
  await seed();
  const db = await getDb();
  const where: string[] = [];
  const params: string[] = [];
  if (kind) (where.push("kind = ?"), params.push(kind));
  if (activeOnly) where.push("is_active = 1");
  const rows = await db.all(`SELECT * FROM form_options ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY kind, sort_order, id`, params);
  return rows.map(toOption);
}

export type FormChoices = Record<"serviceType" | "profession" | "nationality", { code: string; label: string }[]>;

/** The dropdown choices the landing page renders, in the visitor's language. */
export async function getFormChoices(locale: Locale): Promise<FormChoices> {
  const all = await listOptions(undefined, true);
  const pick = (kind: OptionKind) => all.filter((o) => o.kind === kind).map((o) => ({ code: o.code, label: locale === "ar" ? o.nameAr : o.nameEn }));
  return { serviceType: pick("service"), profession: pick("profession"), nationality: pick("nationality") };
}

/** The design's own choices, used to keep the landing page up if the database cannot be reached. */
export function defaultChoices(locale: Locale): FormChoices {
  const pick = (kind: OptionKind) => DEFAULTS[kind].map(([code, en, ar]) => ({ code, label: locale === "ar" ? ar : en }));
  return { serviceType: pick("service"), profession: pick("profession"), nationality: pick("nationality") };
}

export async function isActiveOption(kind: OptionKind, code: string) {
  await seed();
  const db = await getDb();
  return !!(await db.get("SELECT id FROM form_options WHERE kind = ? AND code = ? AND is_active = 1", [kind, code]));
}

export function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 40);
}

export async function addOption(kind: OptionKind, code: string, nameEn: string, nameAr: string) {
  const db = await getDb();
  const next = Number((await db.get("SELECT COALESCE(MAX(sort_order), 0) + 1 AS n FROM form_options WHERE kind = ?", [kind]))?.n ?? 1);
  await db.run("INSERT INTO form_options (kind, code, name_en, name_ar, sort_order, is_active) VALUES (?, ?, ?, ?, ?, 1)", [kind, code, nameEn, nameAr, next]);
}

export async function updateOption(id: number, nameEn: string, nameAr: string) {
  await (await getDb()).run("UPDATE form_options SET name_en = ?, name_ar = ? WHERE id = ?", [nameEn, nameAr, id]);
}

export async function setOptionActive(id: number, active: boolean) {
  await (await getDb()).run("UPDATE form_options SET is_active = ? WHERE id = ?", [active ? 1 : 0, id]);
}

export async function removeOption(id: number) {
  await (await getDb()).run("DELETE FROM form_options WHERE id = ?", [id]);
}

/** Swaps an option with its neighbour in the same list. */
export async function moveOption(id: number, direction: "up" | "down") {
  const db = await getDb();
  const all = await listOptions();
  const current = all.find((o) => o.id === id);
  if (!current) return;
  const same = all.filter((o) => o.kind === current.kind);
  const i = same.findIndex((o) => o.id === id);
  const other = same[direction === "up" ? i - 1 : i + 1];
  if (!other) return;
  // Re-number the whole list so equal sort values can never leave the order ambiguous.
  const order = same.map((o) => o.id);
  [order[i], order[order.indexOf(other.id)]] = [other.id, id];
  for (let n = 0; n < order.length; n++) await db.run("UPDATE form_options SET sort_order = ? WHERE id = ?", [n + 1, order[n]]);
}

export async function optionNames(): Promise<Record<OptionKind, Record<string, { en: string; ar: string }>>> {
  const all = await listOptions();
  const out: Record<OptionKind, Record<string, { en: string; ar: string }>> = { service: {}, profession: {}, nationality: {} };
  for (const o of all) out[o.kind][o.code] = { en: o.nameEn, ar: o.nameAr };
  return out;
}
