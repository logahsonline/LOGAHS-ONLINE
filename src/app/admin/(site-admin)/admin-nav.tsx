import Link from "next/link";
import React from "react";

export function AdminNav({
  active,
}: {
  active?:
    | "overview"
    | "settings"
    | "clubs"
    | "sports"
    | "polls"
    | "moderation";
}) {
  const items: Array<{ key: typeof active; href: string; label: string }> = [
    { key: "overview", href: "/admin", label: "Overview" },
    { key: "settings", href: "/admin/settings", label: "Settings" },
    { key: "clubs", href: "/admin/clubs", label: "Clubs" },
    { key: "sports", href: "/admin/sports", label: "Sports" },
    { key: "polls", href: "/admin/polls", label: "Polls" },
    { key: "moderation", href: "/admin/moderation", label: "Moderation" },
  ];

  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold">
      {items.map((it) => {
        const isActive = active && it.key === active;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={
              isActive
                ? "rounded-full bg-sky-600 px-4 py-2 text-white"
                : "rounded-full px-4 py-2 hover:bg-sky-50 dark:hover:bg-white/5 border border-transparent"
            }
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}

