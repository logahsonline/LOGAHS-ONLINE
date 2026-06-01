import Link from "next/link";
import { getServerSupabaseClient } from "../../lib/supabase/server";

const DEFAULT_SPORTS = [
  "Chess",
  "Basketball",
  "Soccer",
  "Volleyball",
  "Handball",
  "Bible Quiz",
  "Netball",
  "Running Events",
] as const;

function toSportSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

type SportRow = {
  id?: string | null;
  name?: string | null;
  slug?: string | null;
};

export default async function SportsPage() {
  const supabase = getServerSupabaseClient();

  const { data: sports } = await supabase
    .from("sports")
    .select("id, name, slug")
    .order("name", { ascending: true })
    .limit(200);

  const items: Array<{ id?: string; name: string; slug: string }> =
    sports && sports.length > 0
      ? (sports as SportRow[]).map((s) => ({
          id: s.id ?? undefined,
          name: s.name ?? "",
          slug: s.slug ?? toSportSlug(s.name ?? ""),
        }))
      : DEFAULT_SPORTS.map((name) => ({ name, slug: toSportSlug(name) }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Sports</h1>
      <p className="mt-3 text-slate-700 dark:text-slate-200">
        Rankings, athletes, and media modules.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((s) => (
          <Link
            key={s.id ?? s.slug}
            href={`/sports/${encodeURIComponent(s.slug)}`}
            className="rounded-3xl border border-black/5 bg-white/70 ring-1 ring-black/5 px-5 py-4 shadow-sm hover:shadow transition dark:bg-black/20 dark:ring-white/10"
          >
            <p className="font-extrabold text-lg">{s.name}</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Rankings • Athletes • Media
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

