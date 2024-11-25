import "server-only";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";

export async function createSuperClient() {
  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!,
  );
}
