"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

/** A submit button that disables itself while its server action runs. */
export default function SubmitButton({ children, pending = "Working…", className = "btn primary", formAction, confirm }: { children: ReactNode; pending?: string; className?: string; formAction?: (formData: FormData) => void | Promise<void>; confirm?: string }) {
  const { pending: busy } = useFormStatus();
  return (
    <button
      type="submit"
      className={className}
      disabled={busy}
      formAction={formAction}
      onClick={(event) => {
        if (confirm && !window.confirm(confirm)) event.preventDefault();
      }}
    >
      {busy ? pending : children}
    </button>
  );
}
