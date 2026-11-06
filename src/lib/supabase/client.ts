import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const hasConfig = Boolean(supabaseUrl && supabaseAnonKey);

/** Supabase client — safe even when env is not configured (local-only mode) */
export const supabase: SupabaseClient<Database> = hasConfig
  ? createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      realtime: {
        params: { eventsPerSecond: 10 },
      },
    })
  : (createClient<Database>("https://placeholder.supabase.co", "placeholder-key", {
      auth: { persistSession: false, autoRefreshToken: false },
    }) as SupabaseClient<Database>);

export const isSupabaseConfigured = hasConfig;
