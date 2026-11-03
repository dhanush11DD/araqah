"use server";

import { redirect } from "next/navigation";
import { backWith } from "@/components/admin/ui";
import { logActivity } from "@/lib/activity";
import { requireAdmin } from "@/lib/auth";
import { keyMode, testMoyasar } from "@/lib/payments";
import { saveSettings, type SettingInput } from "@/lib/settings";

const PATH = "/admin/payment-gateway";

export async function saveGatewayAction(formData: FormData) {
  const user = await requireAdmin({ adminOnly: true });
  const publishable = String(formData.get("publishableKey") ?? "").trim();
  const secret = String(formData.get("secretKey") ?? "").trim();
  const webhook = String(formData.get("webhookSecret") ?? "").trim();
  if (publishable && !/^pk_(test|live)_/.test(publishable)) redirect(backWith(PATH, "err", "The publishable key should start with pk_test_ or pk_live_."));
  if (secret && !/^sk_(test|live)_/.test(secret)) redirect(backWith(PATH, "err", "The secret key should start with sk_test_ or sk_live_. Never paste the publishable key here."));
  if (webhook && webhook.length < 12) redirect(backWith(PATH, "err", "Use a webhook secret of at least 12 characters (press Generate)."));

  const inputs: SettingInput[] = [{ key: "moyasar.publishableKey", value: publishable }];
  // Blank secret boxes keep what is already saved.
  if (secret) inputs.push({ key: "moyasar.secretKey", value: secret, secret: true });
  if (webhook) inputs.push({ key: "moyasar.webhookSecret", value: webhook, secret: true });
  await saveSettings(inputs);
  await logActivity({ actor: user.email, kind: "settings", message: `Payment gateway settings saved (${keyMode(publishable)} publishable key${secret ? ", secret key changed" : ""}${webhook ? ", webhook secret changed" : ""})` });
  redirect(backWith(PATH, "ok", "Payment gateway settings saved. Use “Test connection” to check the keys."));
}

export async function testGatewayAction() {
  const user = await requireAdmin({ adminOnly: true });
  const result = await testMoyasar();
  await logActivity({ actor: user.email, kind: "payment", message: `Gateway connection test: ${result.ok ? "OK" : "FAILED"}: ${result.message}` });
  redirect(backWith(PATH, result.ok ? "ok" : "err", result.message));
}
