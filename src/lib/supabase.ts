import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getEnv, requireEnv } from '@/lib/env';

let admin: SupabaseClient | undefined;

/**
 * Server-side Supabase client.
 *
 * Uses the service-role key, so it bypasses RLS — never import this from a
 * client component. It speaks PostgREST over plain fetch, which is why it works
 * on Cloudflare Workers where Prisma's TCP query engine does not.
 *
 * Built lazily: on Workers the environment is only populated once a request is
 * in flight, so nothing may read env at module scope.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!admin) {
    const url = getEnv('SUPABASE_URL') ?? requireEnv('NEXT_PUBLIC_SUPABASE_URL');

    admin = createClient(url, requireEnv('SUPABASE_SERVICE_ROLE_KEY'), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return admin;
}

/**
 * Prisma's `@default(uuid())` and `@updatedAt` are applied by the Prisma client,
 * not by the database — the columns have no DB default. Writes that bypass
 * Prisma must therefore supply them explicitly.
 */
export function newRowDefaults() {
  const now = new Date().toISOString();

  return { id: crypto.randomUUID(), createdAt: now, updatedAt: now };
}

export function touchedAt() {
  return { updatedAt: new Date().toISOString() };
}
