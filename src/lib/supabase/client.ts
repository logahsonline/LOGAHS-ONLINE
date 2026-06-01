import { createClient } from "@supabase/supabase-js";

export function getBrowserSupabaseClient() {
  if (typeof window === "undefined") {
    throw new Error("getBrowserSupabaseClient must run in the browser");
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
}

