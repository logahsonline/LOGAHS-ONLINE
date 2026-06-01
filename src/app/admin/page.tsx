import React from "react";

import { AdminNav } from "./(site-admin)/admin-nav";

export default function SiteAdminPortal() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Site Admin</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Use the navigation to manage site settings, clubs, sports data, polls, and
        moderation.
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
        <div className="font-extrabold">Overview</div>
        <AdminNav active="overview" />
        <ul className="text-sm text-slate-700 dark:text-slate-200 list-disc pl-5 space-y-1">
          <li>Admin pages currently show UI shells (CRUD wiring comes next).</li>
          <li>Access is enforced by Supabase RLS + server-side role gate.</li>
        </ul>
      </div>
    </div>
  );
}


