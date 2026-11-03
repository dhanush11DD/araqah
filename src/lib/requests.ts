// Values shared by the request form, the API and the tracking timeline.

export const LOCALES = ["ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const CONTACT_METHODS = ["call", "email"] as const;

export const STAGE_COUNT = 8;

/** The 8 tracking stages, named as the customer sees them on the landing page. */
export const STAGE_NAMES = {
  en: ["Request Received", "Under Processing", "Candidate Selected", "Processing Formalities", "Flight Booked", "Departed Origin Country", "Awaiting Arrival", "Arrived"],
  ar: ["تم استلام الطلب", "تحت الإجراء", "تم اختيار المرشح", "جاري إنهاء الإجراءات", "تم حجز الرحلة", "غادر بلد الإرسال", "في انتظار الوصول", "وصل"],
} as const;

const ARABIC_DIGITS = /[٠-٩۰-۹]/g;

function toLatinDigits(value: string) {
  return value.replace(ARABIC_DIGITS, (d) => String((d.charCodeAt(0) & 0xf) % 10));
}

/** Returns a Saudi mobile number as +9665XXXXXXXX, or null when it is not one. */
export function normalizeSaudiMobile(input: string): string | null {
  const digits = toLatinDigits(input).replace(/[\s\-().]/g, "");
  const match = digits.match(/^(?:\+966|00966|966|0)?(5\d{8})$/);
  return match ? `+966${match[1]}` : null;
}

export function normalizeTrackingCode(input: string) {
  return toLatinDigits(input).trim().toUpperCase().replace(/\s+/g, "");
}
