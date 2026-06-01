// This project uses "paths": { "@/*": ["./*" ] } in tsconfig.
// Some tooling in this environment still fails to resolve those aliases for typechecking.
// These module declarations act as a fallback so TS can find our known modules.

declare module "@/lib/auth/role" {
  export * from "../../src/lib/auth/role";
}

declare module "@/lib/supabase/server" {
  export * from "../../src/lib/supabase/server";
}

declare module "@/lib/supabase/types" {
  export * from "../../src/lib/supabase/types";
}

