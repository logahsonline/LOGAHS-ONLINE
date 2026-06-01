"use client";

import { useState } from "react";


export default function ThemeBar({
  activeTheme,
  visitorMode,
}: {
  activeTheme: string;
  visitorMode: "light" | "dark";
}) {
  const [mode, setMode] = useState(visitorMode);



  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-500">Theme:</span>
      <span className="font-semibold">{activeTheme}</span>
      <div className="h-5 w-px bg-black/10" />
      <button
        type="button"
        onClick={() => setMode((m) => (m === "dark" ? "light" : "dark"))}
        className="rounded-full border border-black/10 px-3 py-1 hover:bg-black/5 dark:hover:bg-white/10"
      >
        Toggle {mode === "dark" ? "Light" : "Dark"}
      </button>
    </div>
  );
}

