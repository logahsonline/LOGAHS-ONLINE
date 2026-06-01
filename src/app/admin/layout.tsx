import React from "react";
import { requireSiteAdmin } from "../../lib/auth/role";



export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Gate the entire /admin segment.
  const profile = await requireSiteAdmin();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-black/5 bg-white/70 dark:bg-black/10 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-sky-100 ring-1 ring-sky-200 flex items-center justify-center font-black text-sky-700">
              AD
            </div>
            <div className="leading-tight">
              <div className="font-extrabold">Site Admin</div>
              <div className="text-xs font-semibold text-slate-500">
                {profile.display_name ?? profile.id}
              </div>
            </div>
          </div>

          <nav className="flex items-center gap-3 text-sm font-semibold">
            <a
              href="/admin"
              className="rounded-full px-4 py-2 hover:bg-sky-50 dark:hover:bg-white/5"
            >
              Dashboard
            </a>
            <a
              href="/"
              className="rounded-full bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
            >
              Public Site
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>
    </div>
  );
}


