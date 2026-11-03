"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { backWith } from "@/components/admin/ui";
import { logActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import { emailCustomerStage } from "@/lib/notify";
import { STAGE_COUNT, STAGE_NAMES } from "@/lib/requests";
import { getRequest, setStage, updateRequestDetails } from "@/lib/store";

const text = (f: FormData, k: string, max: number) => String(f.get(k) ?? "").trim().slice(0, max);

export async function updateStageAction(id: number, formData: FormData) {
  const user = await requireAdmin();
  const path = `/admin/requests/${id}`;
  const stage = Number(formData.get("stage"));
  if (!Number.isInteger(stage) || stage < 1 || stage > STAGE_COUNT) redirect(backWith(path, "err", "Choose a stage from 1 to 8."));
  const note = text(formData, "note", 500) || null;
  const before = await getRequest(id);
  if (!before) redirect(backWith("/admin/requests", "err", "That request no longer exists."));

  await setStage(id, stage, note, user.email);
  await logActivity({ actor: user.email, kind: "stage", message: `${before.trackingCode}: stage ${before.currentStage} → ${stage} (${STAGE_NAMES.en[stage - 1]})`, entity: "request", entityId: id });

  let message = `Stage updated to ${stage}: ${STAGE_NAMES.en[stage - 1]}.`;
  if (formData.get("notify") === "on") {
    const after = (await getRequest(id))!;
    const result = await emailCustomerStage(after, note, user.email);
    if (result.ok) message += " The customer was emailed.";
    else redirect(backWith(path, "err", `${message} The email was not sent: ${result.error}`));
  }
  revalidatePath(path);
  redirect(backWith(path, "ok", message));
}

export async function saveDetailsAction(id: number, formData: FormData) {
  const user = await requireAdmin();
  const path = `/admin/requests/${id}`;
  const email = text(formData, "email", 190).toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) redirect(backWith(path, "err", "That email address does not look right."));
  await updateRequestDetails(id, { email: email || null, city: text(formData, "city", 80) || null, adminNote: text(formData, "adminNote", 2000) || null });
  await logActivity({ actor: user.email, kind: "request", message: `Details saved for request #${id}`, entity: "request", entityId: id });
  redirect(backWith(path, "ok", "Details saved."));
}
