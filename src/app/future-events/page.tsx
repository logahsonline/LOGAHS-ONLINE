import { getServerSupabaseClient } from "../../lib/supabase/server";

export default async function FutureEventsPage() {
  const supabase = getServerSupabaseClient();

  const { data: events } = await supabase
    .from("events")
    .select("id, title, start_date")
    .order("start_date", { ascending: true })
    .limit(50);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Future Events</h1>
      <p className="mt-3 text-slate-700 dark:text-slate-200">
        Upcoming tournaments and school-wide activities.
      </p>

      <div className="mt-6 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
        <h2 className="font-extrabold">Upcoming</h2>
        <ul className="mt-4 space-y-3">
          {(events ?? []).map((e: any) => (
            <li key={e.id} className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-extrabold">{e.title ?? "(Untitled)"}</div>
              </div>
              <div className="text-xs font-semibold text-slate-500">
                {e.start_date ? new Date(e.start_date).toLocaleDateString() : ""}
              </div>
            </li>
          ))}
          {(!events || events.length === 0) && (
            <li className="text-sm font-semibold text-slate-500">
              No future events found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}


