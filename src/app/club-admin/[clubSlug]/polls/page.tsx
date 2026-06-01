import React from "react";
import { requireClubAdmin } from "../../../../lib/auth/role";

export default async function ClubAdminPollsPage({
  params,
}: {
  params: { clubSlug: string };
}) {
  await requireClubAdmin(params.clubSlug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Club Polls</h1>
      <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
        Club: {params.clubSlug}
      </p>

      <div className="mt-6 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
        <div className="font-extrabold">Coming next</div>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
          Poll write permissions are site-admin only per current RLS. If you want club-specific polls, update policies.
        </p>
      </div>
    </div>
  );
}

