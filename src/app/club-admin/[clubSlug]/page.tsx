import React from "react";
import { requireClubAdmin } from "../../../lib/auth/role";

export default async function ClubAdminPortalPage({
  params,
}: {
  params: { clubSlug: string };
}) {
  // Gate this entire /club-admin/[clubSlug] segment.
  await requireClubAdmin(params.clubSlug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Club Admin Portal</h1>
      <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
        Club: {params.clubSlug}
      </p>

      <div className="mt-6 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
        <h2 className="font-extrabold">What you can manage</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
          <li>• Club logo &amp; club-scoped media</li>
          <li>• Club-scoped posts/updates</li>
          <li>• Club events &amp; sports module links (where RLS allows)</li>
          <li>• Moderation actions (where RLS allows)</li>
        </ul>

        <p className="mt-4 text-xs font-semibold text-slate-500">
          Dashboard UI shells are implemented; CRUD forms will be wired to Supabase tables next.
        </p>
      </div>
    </div>
  );
}


