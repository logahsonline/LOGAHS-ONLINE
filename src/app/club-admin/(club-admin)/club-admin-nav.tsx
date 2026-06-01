import Link from "next/link";
import React from "react";

export function ClubAdminNav({
  clubSlug,
  active,
}: {
  clubSlug: string;
  active?: "dashboard" | "posts" | "polls";
}) {
  const items: Array<{ key: typeof active; href: string; label: string }> = [
    {
      key: "dashboard",
      href: `/club-admin/${encodeURIComponent(clubSlug)}`,
      label: "Dashboard",
    },
    {
      key: "posts",
      href: `/club-admin/${encodeURIComponent(clubSlug)}/posts`,
      label: "Posts/Media",
    },
    {
      key: "polls",
      href: `/club-admin/${encodeURIComponent(clubSlug)}/polls`,
      label: "Polls",
    },
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

