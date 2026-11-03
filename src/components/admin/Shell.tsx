"use client";

import { useState, type ReactNode } from "react";

/** Wraps the sidebar and page so the phone menu can open and close. */
export default function Shell({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="shell" data-nav={open ? "open" : "closed"} onClick={(e) => (e.target as Element).closest("a") && setOpen(false)}>
      <aside className="side">{sidebar}</aside>
      <div className="scrim" onClick={() => setOpen(false)} />
      <div style={{ minWidth: 0 }}>
        <div className="mob">
          <strong>Araqah Admin</strong>
          <button type="button" className="btn sm" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{open ? "Close" : "Menu"}</button>
        </div>
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
