import React from "react";
import { requireSiteAdmin } from "../../../lib/auth/role";

export default async function AdminModerationPage() {
  await requireSiteAdmin();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Moderation</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Moderate posts, comments, and media where permitted by RLS.
      </p>

      <div className="mt-6 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
        <div className="font-extrabold">Coming next</div>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
          Approval/publish queues will be implemented once the content creation flow is finalized.
        </p>
      </div>
    </div>
  );
}

