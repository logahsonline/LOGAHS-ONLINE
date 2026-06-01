import Link from "next/link";
import { getServerSupabaseClient } from "../../lib/supabase/server";

export default async function NewsPage() {
  const supabase = getServerSupabaseClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">News</h1>
      <p className="mt-3 text-slate-700 dark:text-slate-200">
        Latest written updates.
      </p>

      <div className="mt-6 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold">Latest posts</h2>
          <span className="text-xs font-semibold text-slate-500">
            {posts?.length ?? 0} items
          </span>
        </div>

        <ul className="mt-4 space-y-3">
          {(posts ?? []).map((p: any) => (
            <li key={p.id} className="flex items-center justify-between gap-4">
              <Link
                href={`/news/${p.id}`}
                className="text-sm font-semibold text-sky-800 hover:text-sky-700 dark:text-sky-200 dark:hover:text-sky-300"
              >
                {p.title ?? "(Untitled)"}
              </Link>
              <time className="text-xs font-semibold text-slate-500">
                {p.created_at ? new Date(p.created_at).toLocaleDateString() : ""}
              </time>
            </li>
          ))}
          {(!posts || posts.length === 0) && (
            <li className="text-sm font-semibold text-slate-500">
              No posts yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}


