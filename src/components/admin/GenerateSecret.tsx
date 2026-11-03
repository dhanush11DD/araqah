"use client";

import { useRef } from "react";

/** A password-style input with a button that fills it with a random secret. */
export default function GenerateSecret({ name, placeholder }: { name: string; placeholder?: string }) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className="row" style={{ flexWrap: "nowrap" }}>
      <input ref={input} type="text" name={name} placeholder={placeholder} autoComplete="off" spellCheck={false} />
      <button
        type="button"
        className="btn sm"
        onClick={() => {
          const bytes = crypto.getRandomValues(new Uint8Array(24));
          if (input.current) input.current.value = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
        }}
      >
        Generate
      </button>
    </div>
  );
}
