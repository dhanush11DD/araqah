"use client";

import { useState, type FormEvent } from "react";
import type { Copy } from "./copy";
import Modal from "./Modal";

type Result = { trackingCode: string; currentStage: number; history: { stage: number; at: string }[] };
type Props = { t: Copy; initialCode?: string; onClose: () => void };

const field = { width: "100%", boxSizing: "border-box", height: "48px", padding: "0 14px", borderRadius: "10px", border: "1.5px solid #E4DCCB", background: "#FAF7F0", color: "#141414", fontSize: "15px", fontFamily: "inherit" } as const;
const label = { display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px", fontWeight: "700", color: "#141414" } as const;

export default function TrackModal({ t, initialCode = "", onClose }: Props) {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code: data.get("code"), phone: data.get("phone") }),
      });
      if (res.ok) setResult(await res.json());
      else setError(res.status === 404 ? t.track.notFound : res.status === 429 ? t.errors.rateLimited : t.errors.generic);
    } catch {
      setError(t.errors.generic);
    } finally {
      setBusy(false);
    }
  }

  const dates = new Map(result?.history.map((h) => [h.stage, h.at]));
  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(t.track.dateLocale, { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

  return (
    <Modal title={t.track.title} closeLabel={t.close} font={t.bodyFont} headingFont={t.headingFont} onClose={onClose}>
      {!result ? (
        <form onSubmit={onSubmit} noValidate>
          <p style={{ margin: "12px 0 0", fontSize: "16px", lineHeight: "1.65", color: "#3D3D3D" }}>{t.track.intro}</p>
          <div style={{ display: "grid", gap: "14px", marginTop: "22px" }}>
            <label style={label}>
              {t.track.codeLabel}
              <input name="code" defaultValue={initialCode} placeholder={t.track.codePlaceholder} autoComplete="off" dir="ltr" style={field} />
            </label>
            <label style={label}>
              {t.track.phoneLabel}
              <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="05XXXXXXXX" dir="ltr" style={field} />
            </label>
          </div>
          <button
            type="submit"
            disabled={busy}
            style={{ marginTop: "20px", width: "100%", height: "54px", border: "0", borderRadius: "12px", background: "#F5C518", color: "#141414", fontSize: "16px", fontWeight: "800", fontFamily: "inherit", cursor: "pointer" }}
          >
            {busy ? t.track.searching : t.track.submit}
          </button>
          {error && (
            <p role="alert" style={{ margin: "12px 0 0", fontSize: "14px", fontWeight: "700", color: "#B42318", textAlign: "center" }}>
              {error}
            </p>
          )}
        </form>
      ) : (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px", marginTop: "18px" }}>
            <p style={{ margin: "0", fontSize: "15px", fontWeight: "800" }}>
              {t.track.requestNumber} <bdi dir="ltr">{result.trackingCode}</bdi>
            </p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "999px", background: "#FFF4CC", fontSize: "13px", fontWeight: "800" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#C99A00" }}></span>
              {t.track.stageOf(result.currentStage)}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, minmax(0, 1fr))", gap: "4px", marginTop: "16px" }} aria-hidden="true">
            {t.track.stages.map((_, i) => (
              <span key={i} style={{ height: "6px", borderRadius: "3px", background: i < result.currentStage ? "#F5C518" : "#ECE6DA" }}></span>
            ))}
          </div>
          <ol style={{ listStyle: "none", margin: "18px 0 0", padding: "0" }}>
            {t.track.stages.map((name, i) => {
              const stage = i + 1;
              const done = stage < result.currentStage;
              const current = stage === result.currentStage;
              const at = dates.get(stage);
              return (
                <li
                  key={stage}
                  aria-current={current ? "step" : undefined}
                  style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: current ? "8px 12px" : "8px 0", margin: current ? "0 -12px" : "0", borderRadius: "14px", background: current ? "#FAF7F0" : "transparent" }}
                >
                  <div style={{ position: "relative", flex: "0 0 30px", alignSelf: "stretch" }}>
                    {done ? (
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "#141414", color: "#F5C518" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                        </svg>
                      </span>
                    ) : current ? (
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", background: "#F5C518", boxShadow: "0 0 0 6px rgba(245,197,24,0.3)" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#141414" }}></span>
                      </span>
                    ) : (
                      <span style={{ display: "inline-flex", width: "30px", height: "30px", borderRadius: "50%", background: "#FFFFFF", border: "2px solid #E0D8C8", boxSizing: "border-box" }}></span>
                    )}
                  </div>
                  <div style={{ flexGrow: "1", paddingTop: "4px" }}>
                    <p style={{ margin: "0", fontSize: "15px", fontWeight: done || current ? "800" : "600", color: done || current ? "#141414" : "#8A857A" }}>{name}</p>
                  </div>
                  {at && <span style={{ flex: "0 0 auto", paddingTop: "5px", fontSize: "13px", color: "#5C5A55" }}>{formatDate(at)}</span>}
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            onClick={() => setResult(null)}
            style={{ marginTop: "18px", width: "100%", minHeight: "50px", borderRadius: "10px", border: "1.5px solid #141414", background: "transparent", color: "#141414", fontSize: "15px", fontWeight: "700", fontFamily: "inherit", cursor: "pointer" }}
          >
            {t.track.another}
          </button>
        </div>
      )}
    </Modal>
  );
}
