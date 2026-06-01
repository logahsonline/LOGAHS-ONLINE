import "../globals.css";
import Link from "next/link";
import React from "react";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-black/5 bg-white/70 dark:bg-black/10 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-sky-100 ring-1 ring-sky-200 flex items-center justify-center font-black text-sky-700">
              LO
            </div>
            <div className="leading-tight">
              <div className="font-extrabold">LOGAHS ONLINE</div>
              <div className="text-xs font-semibold text-slate-500">School Update Portal</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <Link href="/" className="hover:text-sky-800 dark:hover:text-sky-200">
              Home
            </Link>
            <Link href="/news" className="hover:text-sky-800 dark:hover:text-sky-200">
              News
            </Link>
            <Link href="/sports" className="hover:text-sky-800 dark:hover:text-sky-200">
              Sports
            </Link>
            <Link href="/clubs" className="hover:text-sky-800 dark:hover:text-sky-200">
              Clubs
            </Link>
            <Link href="/future-events" className="hover:text-sky-800 dark:hover:text-sky-200">
              Future Events
            </Link>
            <Link href="/polls" className="hover:text-sky-800 dark:hover:text-sky-200">
              Polls
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/admin"
              className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-sky-700 transition text-sm"
            >
              Admin
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">LOGAHS ONLINE</p>
            <p className="text-xs text-slate-500 mt-1">Built for global, realtime school updates.</p>
          </div>
          <div className="flex gap-3 text-xs font-semibold text-slate-600">
            <Link href="/news" className="hover:text-sky-700">
              News
            </Link>
            <Link href="/sports" className="hover:text-sky-700">
              Sports
            </Link>
            <Link href="/clubs" className="hover:text-sky-700">
              Clubs
            </Link>
            <Link href="/polls" className="hover:text-sky-700">
              Polls
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}


