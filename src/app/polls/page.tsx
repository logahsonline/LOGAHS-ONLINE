import Link from "next/link";
import { getServerSupabaseClient } from "../../lib/supabase/server";

export default async function PollsPage() {
  const supabase = getServerSupabaseClient();

  const { data: polls } = await supabase
    .from("polls")
    .select("id, question, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Polls</h1>
      <p className="mt-3 text-slate-700 dark:text-slate-200">
        Vote and view real-time results.
      </p>

      <div className="mt-6 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
        <h2 className="font-extrabold">Community polls</h2>
        <ul className="mt-4 space-y-3">
          {(polls ?? []).map((p) => (
            <li
              key={String((p as { id?: string | null }).id)}
              className="flex items-center justify-between gap-4"
            >
              <Link
                href={`/polls/${String((p as { id?: string | null }).id)}`}

                className="text-sm font-semibold text-sky-800 hover:text-sky-700 dark:text-sky-200 dark:hover:text-sky-300"
              >
                {(p as { question?: string | null }).question ?? "(Untitled poll)"}
              </Link>
              <time className="text-xs font-semibold text-slate-500">
                {(p as { created_at?: string | null }).created_at
                  ? new Date((p as { created_at?: string | null }).created_at as string)
                      .toLocaleDateString()
                  : ""}
              </time>
            </li>
          ))}
          {(!polls || polls.length === 0) && (
            <li className="text-sm font-semibold text-slate-500">
              No polls found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}


