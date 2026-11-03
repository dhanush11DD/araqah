"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export type NavItem = { href: string; label: string; icon: ReactNode; exact?: boolean };

export default function Nav({ groups }: { groups: { title: string; items: NavItem[] }[] }) {
  const path = usePathname();
  return (
    <nav className="nav" aria-label="Admin">
      {groups.map((g) => (
        <div key={g.title} className="nav">
          <div className="nav-title">{g.title}</div>
          {g.items.map((i) => {
            const active = i.exact ? path === i.href : path === i.href || path.startsWith(`${i.href}/`);
            return (
              <Link key={i.href} href={i.href} aria-current={active ? "page" : undefined}>
                {i.icon}
                {i.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
