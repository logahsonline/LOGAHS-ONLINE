import React from "react";
import { requireClubAdmin } from "../../../../lib/auth/role";

export default async function ClubAdminPostsPage({
  params,
}: {
  params: { clubSlug: string };
}) {
  await requireClubAdmin(params.clubSlug);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Club Posts & Media</h1>
      <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
        Club: {params.clubSlug}
      </p>

      <div className="mt-6 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
        <div className="font-extrabold">Coming next</div>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
          CRUD UI for <code>posts</code>, <code>post_videos</code>, <code>post_pictures</code> scoped to this club.
        </p>
      </div>
    </div>
  );
}

