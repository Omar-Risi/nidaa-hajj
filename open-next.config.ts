import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default {
  ...defineCloudflareConfig(),
  // Cloudflare Workers Builds runs `npm run build`, which now invokes
  // `opennextjs-cloudflare build`. Pin the inner Next.js build explicitly —
  // otherwise the adapter defaults to re-running `npm run build` and recurses.
  buildCommand: 'next build',
};
