import type { ReactNode } from "react";
import Nav, { type NavItem } from "@/components/admin/Nav";
import Shell from "@/components/admin/Shell";
import SubmitButton from "@/components/admin/SubmitButton";
import { icons } from "@/components/admin/icons";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();
  const groups: { title: string; items: NavItem[] }[] = [
    { title: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: icons.home, exact: true }] },
    {
      title: "Customers",
      items: [
        { href: "/admin/requests", label: "Requests", icon: icons.users },
        { href: "/admin/payments", label: "Payment links", icon: icons.link },
      ],
    },
    {
      title: "Website",
      items: [
        { href: "/admin/form-options", label: "Form options", icon: icons.list },
        { href: "/admin/mail", label: "Mail templates", icon: icons.mail },
      ],
    },
    ...(user.role === "admin"
      ? [{
          title: "Settings",
          items: [
            { href: "/admin/mail-server", label: "Mail server", icon: icons.server },
            { href: "/admin/payment-gateway", label: "Payment gateway", icon: icons.card },
          ],
        }]
      : []),
    {
      title: "System",
      items: [
        { href: "/admin/logs", label: "Activity logs", icon: icons.log },
        { href: "/admin/team", label: "Team & account", icon: icons.team },
      ],
    },
  ];
  return (
    <Shell
      sidebar={
        <>
          <a className="brand" href="/admin"><b>A</b> Araqah Admin</a>
          <Nav groups={groups} />
          <div className="me">
            <div>
              <strong>{user.name}</strong>
              <div className="small" style={{ color: "#bdb8aa" }}>{user.email} · {user.role}</div>
            </div>
            <a className="btn sm" href="/ar" target="_blank" rel="noreferrer">View website ↗</a>
            <form action={logoutAction}><SubmitButton className="btn sm" pending="Signing out…">Sign out</SubmitButton></form>
          </div>
        </>
      }
    >
      {children}
    </Shell>
  );
}
