import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { requireEnv } from '@/lib/env';

let client: SupabaseClient | undefined;

/**
 * Lazily constructed so the module can be imported during the Worker's
 * top-level evaluation, where the environment is not yet available.
 *
 * NEXT_PUBLIC_* values are inlined at build time, so they must also be present
 * in the build environment — a Worker secret alone is not enough for them.
 */
export function getSupabase(): SupabaseClient {
  if (!client) {
    client = createClient(
      requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
      requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    );
  }

  return client;
}
