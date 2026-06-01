import React from "react";
import { requireSiteAdmin } from "../../../lib/auth/role";

export default async function AdminSettingsPage() {
  await requireSiteAdmin();

  // For now, UI shell only. CRUD forms will be wired to Supabase next.
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Site Settings</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Manage site name, top logos, and active theme.
      </p>

      <div className="mt-6 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
        <div className="font-extrabold">Coming next</div>
        <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 dark:text-slate-200">
          <li>Update <code>site_settings</code> row</li>
          <li>Select theme from <code>theme_catalog</code></li>
          <li>Upload/assign top logo paths</li>
        </ul>
      </div>
    </div>
  );
}

