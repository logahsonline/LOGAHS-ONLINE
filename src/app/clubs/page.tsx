import Link from "next/link";
import Image from "next/image";
import { getServerSupabaseClient } from "../../lib/supabase/server";

export default async function ClubsPage() {
  const supabase = getServerSupabaseClient();

  const { data: clubs } = await supabase
    .from("clubs")
    .select("id, name, slug, logo_url")
    .order("name", { ascending: true })
    .limit(200);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-extrabold">Clubs</h1>
      <p className="mt-3 text-slate-700 dark:text-slate-200">
        Explore the clubs network.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(clubs ?? []).map((club) => (
          <Link
            key={String((club as { id?: string | null }).id)}
            href={`/clubs/${encodeURIComponent(
              (club as { slug?: string | null }).slug ?? ""
            )}`}

            className="rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 p-5 shadow-sm hover:shadow transition"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-2xl ring-1 ring-black/5 bg-white/80 overflow-hidden">
                {(club as { logo_url?: string | null }).logo_url ? (
                  <Image
                    src={(club as { logo_url?: string | null }).logo_url as string}
                    alt={(club as { name?: string | null }).name ?? "Club logo"}
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-xs font-extrabold text-slate-600">
                    {String((club as { name?: string | null }).name ?? "")
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
              </div>
              <div>
                <div className="font-extrabold">
                  {(club as { name?: string | null }).name ?? "(Untitled club)"}
                </div>
                <div className="text-xs font-semibold text-slate-500">Follow • Videos • Updates</div>
              </div>
            </div>
          </Link>
        ))}

        {(!clubs || clubs.length === 0) && (
          <div className="col-span-full text-sm font-semibold text-slate-500">
            No clubs found.
          </div>
        )}
      </div>
    </div>
  );
}


