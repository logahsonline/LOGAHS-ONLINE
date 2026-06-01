import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/25 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-4">
            {/* Two editable logos will be wired to Supabase later */}
            <div className="relative h-12 w-12 rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm overflow-hidden">
              <Image src="/file.svg" alt="School Logo 1" fill className="object-contain p-2" />
            </div>
            <div className="relative h-12 w-12 rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm overflow-hidden">
              <Image src="/globe.svg" alt="School Logo 2" fill className="object-contain p-2" />
            </div>

            <div className="flex flex-col">
              <p className="text-xs font-semibold tracking-widest text-sky-700 uppercase">
                School Updates
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                LOGAHS ONLINE
              </h1>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed">
                News, future events, sports results, club updates, polls, and live match coverage —
                all synced globally.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#news"
                  className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-sky-700 transition"
                >
                  Latest News
                </a>
                <a
                  href="#sports"
                  className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-slate-900 font-semibold ring-1 ring-black/5 shadow-sm hover:bg-white transition dark:bg-white/5 dark:text-white"
                >
                  Sports Portal
                </a>
                <a
                  href="#clubs"
                  className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-slate-900 font-semibold ring-1 ring-black/5 shadow-sm hover:bg-white transition dark:bg-white/5 dark:text-white"
                >
                  Clubs Network
                </a>
                <a
                  href="#polls"
                  className="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-slate-900 font-semibold ring-1 ring-black/5 shadow-sm hover:bg-white transition dark:bg-white/5 dark:text-white"
                >
                  Community Polls
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6 backdrop-blur">
                <h2 className="text-lg font-bold">Quick Highlights</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                    <span>
                      Real-time updates for news, comments, likes &amp; polls.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <span>
                      Sports rankings, athlete profiles, and live match modules.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500" />
                    <span>
                      Club follow network and dedicated club video pages.
                    </span>
                  </li>
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white ring-1 ring-black/5 p-4">
                    <p className="text-xs font-semibold text-slate-500">Sports</p>
                    <p className="text-xl font-extrabold">8</p>
                  </div>
                  <div className="rounded-2xl bg-white ring-1 ring-black/5 p-4">
                    <p className="text-xs font-semibold text-slate-500">Clubs</p>
                    <p className="text-xl font-extrabold">4+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        {/* News */}
        <section id="news" className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-extrabold">News &amp; Future Events</h2>
            <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">
              Powered by Supabase
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Latest Updates</h3>
                <button
                  type="button"
                  className="rounded-full bg-sky-50 text-sky-700 px-3 py-1 text-xs font-semibold ring-1 ring-sky-200 hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20"
                >
                  Subscribe
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {/* Content cards will be replaced by Supabase data */}
                <article className="rounded-2xl bg-white dark:bg-black/20 ring-1 ring-black/5 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-extrabold">Announcement: School Sports Week</h4>
                    <time className="text-xs font-semibold text-slate-500">Today</time>
                  </div>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                    Registration opens now. Submit team lists before the deadline.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20">
                      Downloadable attachments
                    </span>
                    <span className="text-xs font-semibold rounded-full bg-sky-50 text-sky-700 px-3 py-1 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20">
                      Comment enabled
                    </span>
                  </div>
                </article>

                <article className="rounded-2xl bg-white dark:bg-black/20 ring-1 ring-black/5 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-extrabold">Upcoming: Inter-Club Debate</h4>
                    <time className="text-xs font-semibold text-slate-500">Next week</time>
                  </div>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                    Teams will present on the theme: Leadership &amp; Community Growth.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold rounded-full bg-violet-50 text-violet-700 px-3 py-1 ring-1 ring-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/20">
                      Poll voting
                    </span>
                  </div>
                </article>
              </div>
            </div>

            <aside className="lg:col-span-4 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
              <h3 className="font-bold">Future Events Scheduler</h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                A timeline of upcoming tournaments, fixtures, and school-wide activities.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-white dark:bg-black/20 ring-1 ring-black/5 p-4">
                  <p className="text-xs font-semibold text-slate-500">Date</p>
                  <p className="font-extrabold">Aug 12</p>
                  <p className="mt-1 text-sm">Chess: Inter-house Rapid Round</p>
                </div>
                <div className="rounded-2xl bg-white dark:bg-black/20 ring-1 ring-black/5 p-4">
                  <p className="text-xs font-semibold text-slate-500">Date</p>
                  <p className="font-extrabold">Aug 19</p>
                  <p className="mt-1 text-sm">Running Events: 100m + Relays</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Sports nav */}
        <section id="sports" className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-extrabold">Sports Portal</h2>
            <a
              href="/sports"
              className="text-sm font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
            >
              Explore →
            </a>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Chess", color: "bg-sky-50 text-sky-700 ring-sky-200" },
              { name: "Basketball", color: "bg-amber-50 text-amber-700 ring-amber-200" },
              { name: "Soccer", color: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
              { name: "Volleyball", color: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200" },
              { name: "Handball", color: "bg-rose-50 text-rose-700 ring-rose-200" },
              { name: "Bible Quiz", color: "bg-indigo-50 text-indigo-700 ring-indigo-200" },
              { name: "Netball", color: "bg-cyan-50 text-cyan-700 ring-cyan-200" },
              { name: "Running Events", color: "bg-lime-50 text-lime-700 ring-lime-200" },
            ].map((s) => (
              <a
                key={s.name}
                href={`/sports/${encodeURIComponent(s.name.toLowerCase().replace(/\s+/g, "-"))}`}
                className={`rounded-3xl border border-black/5 ${s.color} px-5 py-4 shadow-sm hover:shadow transition dark:bg-black/20 dark:ring-white/10`}
              >
                <p className="font-extrabold text-lg">{s.name}</p>
                <p className="mt-1 text-xs font-semibold text-slate-500">Rankings • Athletes • Media</p>
              </a>
            ))}
          </div>
        </section>

        {/* Clubs nav */}
        <section id="clubs" className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-extrabold">Clubs Network</h2>
            <a
              href="/clubs"
              className="text-sm font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
            >
              See all clubs →
            </a>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Paramount Club", "Interact Club", "Peer Educators Network", "Computer Club"].map(
              (club) => (
                <a
                  key={club}
                  href={`/clubs/${encodeURIComponent(club.toLowerCase().replace(/\s+/g, "-"))}`}
                  className="rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 p-5 shadow-sm hover:shadow transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-sky-100 ring-1 ring-sky-200 flex items-center justify-center text-sky-700 font-black">
                      {club
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <p className="font-extrabold">{club}</p>
                      <p className="text-xs font-semibold text-slate-500">Follow • Videos • Updates</p>
                    </div>
                  </div>
                </a>
              )
            )}
          </div>
        </section>

        {/* Polls */}
        <section id="polls" className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-extrabold">Community Polls</h2>
            <a
              href="/polls"
              className="text-sm font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-300 dark:hover:text-sky-200"
            >
              Vote now →
            </a>
          </div>

          <div className="mt-5 rounded-3xl bg-white/70 dark:bg-white/5 ring-1 ring-black/5 shadow-sm p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-extrabold text-lg">Which event should we highlight next?</p>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                  Visitors can vote and instantly see percentage results.
                </p>
              </div>
              <span className="text-xs font-semibold rounded-full bg-sky-50 text-sky-700 px-3 py-1 ring-1 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20">
                Realtime
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white dark:bg-black/20 ring-1 ring-black/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold">Inter-Club Debate</p>
                  <p className="text-sm font-semibold text-slate-500">—</p>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                  <div className="h-full w-[25%] bg-sky-500" />
                </div>
              </div>
              <div className="rounded-2xl bg-white dark:bg-black/20 ring-1 ring-black/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold">Sports Awards</p>
                  <p className="text-sm font-semibold text-slate-500">—</p>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                  <div className="h-full w-[75%] bg-sky-500" />
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Voting + percent bars will be connected to Supabase (with realtime updates) next.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">LOGAHS ONLINE</p>
            <p className="text-xs text-slate-500 mt-1">
              Built for global, realtime school updates.
            </p>
          </div>
          <div className="flex gap-3 text-xs font-semibold text-slate-600">
            <a href="#news" className="hover:text-sky-700">News</a>
            <a href="#sports" className="hover:text-sky-700">Sports</a>
            <a href="#clubs" className="hover:text-sky-700">Clubs</a>
            <a href="#polls" className="hover:text-sky-700">Polls</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

