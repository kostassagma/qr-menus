import { createBrowserClient as _ } from "@supabase/ssr";
import { Database } from "../../../database.types";

export function createBrowserClient() {
  // Create a supabase client on the browser with project's credentials
  return _<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
