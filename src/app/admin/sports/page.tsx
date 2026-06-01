import React from "react";
import { requireSiteAdmin } from "../../../lib/auth/role";

export default async function AdminSportsPage() {
  await requireSiteAdmin();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Sports</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Manage sports domain data (rankings, athletes, events, media).
      </p>

      <div className="mt-6 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
        <div className="font-extrabold">Coming next</div>
        <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 dark:text-slate-200">
          <li>CRUD <code>sports</code></li>
          <li>CRUD <code>athletes</code></li>
          <li>CRUD <code>sport_events</code> + live stream URLs</li>
          <li>CRUD ranking tables/entries</li>
          <li>CRUD sport event videos</li>
        </ul>
      </div>
    </div>
  );
}

