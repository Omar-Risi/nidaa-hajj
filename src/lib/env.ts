/**
 * Runtime environment access.
 *
 * On Cloudflare Workers there is no `.env` file and no process at module-eval
 * time: bindings and secrets are only attached to `process.env` once a request
 * is being handled. Reading `process.env.X` at module scope therefore yields
 * `undefined` on Workers even when the variable is configured correctly.
 *
 * Always read secrets through these helpers, from inside a request handler.
 */

export function getEnv(name: string): string | undefined {
  return process.env[name];
}

export function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Set it in .env locally, and as a Worker secret/var for the deployed app.`
    );
  }

  return value;
}
