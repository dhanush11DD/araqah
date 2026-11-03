import { NextResponse } from "next/server";
import { logActivity } from "@/lib/activity";
import { alertStaffOfRequest } from "@/lib/notify";
import { isActiveOption } from "@/lib/options";
import { allow, clientIp } from "@/lib/rate-limit";
import { CONTACT_METHODS, LOCALES, normalizeSaudiMobile } from "@/lib/requests";
import { createRequest, getRequest, type NewRequest } from "@/lib/store";

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function oneOf<T extends string>(value: unknown, options: readonly T[]): T | null {
  return options.includes(value as T) ? (value as T) : null;
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!allow(`requests:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const fullName = text(body.fullName, 120);
  const phone = normalizeSaudiMobile(text(body.phone, 32));
  const serviceType = text(body.serviceType, 40);
  const profession = text(body.profession, 40);
  const nationality = text(body.nationality, 40);
  const contactMethod = oneOf(body.contact, CONTACT_METHODS);
  const locale = oneOf(body.locale, LOCALES) ?? "ar";

  if (fullName.length < 2) return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  if (!phone) return NextResponse.json({ error: "invalid_phone" }, { status: 400 });

  try {
    // The dropdown choices are managed in the admin dashboard, so check against the live list.
    const valid =
      contactMethod &&
      (await isActiveOption("service", serviceType)) &&
      (await isActiveOption("profession", profession)) &&
      (await isActiveOption("nationality", nationality));
    if (!valid) return NextResponse.json({ error: "invalid_choice" }, { status: 400 });

    const newRequest: NewRequest = {
      fullName,
      phone,
      city: text(body.city, 80) || null,
      serviceType,
      profession,
      nationality,
      contactMethod,
      notes: text(body.notes, 1000) || null,
      locale,
    };

    const { id, trackingCode } = await createRequest(newRequest);
    await logActivity({ actor: "customer", kind: "request", message: `New request ${trackingCode} from ${fullName}`, entity: "request", entityId: id, ip });

    // The request is saved; a failed email must not fail the customer's submission.
    try {
      const saved = await getRequest(id);
      if (saved) await alertStaffOfRequest(saved);
    } catch (error) {
      console.error(`Staff email for ${trackingCode} failed`, error);
    }

    return NextResponse.json({ trackingCode }, { status: 201 });
  } catch (error) {
    console.error("Saving recruitment request failed", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
