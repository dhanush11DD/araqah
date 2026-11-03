"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { backWith } from "@/components/admin/ui";
import { logActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import { OPTION_KINDS, addOption, KIND_TITLES, listOptions, moveOption, removeOption, setOptionActive, slugify, updateOption, type OptionKind } from "@/lib/options";

const PATH = "/admin/form-options";
const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim().slice(0, 120);

function publish() {
  // The landing page reads these choices on every request; nothing else to refresh.
  revalidatePath("/ar");
  revalidatePath("/en");
}

async function guardLastActive(id: number) {
  const all = await listOptions();
  const o = all.find((x) => x.id === id);
  if (o?.isActive && all.filter((x) => x.kind === o.kind && x.isActive).length <= 1) {
    redirect(backWith(PATH, "err", `At least one ${KIND_TITLES[o.kind].field.toLowerCase()} choice must stay visible, or the form could not be submitted.`));
  }
  return o;
}

export async function addOptionAction(kind: OptionKind, formData: FormData) {
  const user = await requireAdmin();
  if (!OPTION_KINDS.includes(kind)) redirect(PATH);
  const nameEn = text(formData, "nameEn");
  const nameAr = text(formData, "nameAr");
  if (!nameEn || !nameAr) redirect(backWith(PATH, "err", "Enter the name in both English and Arabic."));
  let code = slugify(nameEn) || `option_${Date.now()}`;
  const existing = await listOptions(kind);
  if (existing.some((o) => o.code === code)) code = `${code}_${existing.length + 1}`;
  await addOption(kind, code, nameEn, nameAr);
  await logActivity({ actor: user.email, kind: "options", message: `Added ${KIND_TITLES[kind].field}: ${nameEn} / ${nameAr}` });
  publish();
  redirect(backWith(PATH, "ok", `Added “${nameEn}”. It is on the website form now.`));
}

export async function saveOptionAction(id: number, formData: FormData) {
  const user = await requireAdmin();
  const nameEn = text(formData, "nameEn");
  const nameAr = text(formData, "nameAr");
  if (!nameEn || !nameAr) redirect(backWith(PATH, "err", "Both names are required."));
  await updateOption(id, nameEn, nameAr);
  await logActivity({ actor: user.email, kind: "options", message: `Renamed option #${id}: ${nameEn} / ${nameAr}` });
  publish();
  redirect(backWith(PATH, "ok", "Saved."));
}

export async function toggleOptionAction(id: number, active: boolean) {
  const user = await requireAdmin();
  if (!active) await guardLastActive(id);
  await setOptionActive(id, active);
  await logActivity({ actor: user.email, kind: "options", message: `${active ? "Showed" : "Hid"} option #${id} on the form` });
  publish();
  redirect(backWith(PATH, "ok", active ? "Now shown on the form." : "Hidden from the form. Existing requests keep their value."));
}

export async function moveOptionAction(id: number, direction: "up" | "down") {
  await requireAdmin();
  await moveOption(id, direction);
  publish();
  redirect(PATH);
}

export async function deleteOptionAction(id: number) {
  const user = await requireAdmin();
  const o = await guardLastActive(id);
  await removeOption(id);
  await logActivity({ actor: user.email, kind: "options", message: `Deleted ${o ? KIND_TITLES[o.kind].field : "option"}: ${o?.nameEn ?? id}` });
  publish();
  redirect(backWith(PATH, "ok", "Deleted. Old requests that used it still show its code."));
}
