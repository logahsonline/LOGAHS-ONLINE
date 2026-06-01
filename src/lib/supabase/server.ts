import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function getServerSupabaseClient() {
  const cookieStore = cookies();

  const getCookie = (name: string) => {
    // next/headers cookies() returns a Promise in this Next.js version typing.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    return (cookieStore as any).get?.(name)?.value ?? undefined;
  };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        get(name: string) {
          return getCookie(name);
        },
      },
    }
  );
}

