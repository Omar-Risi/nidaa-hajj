import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    // Constructed on first use, not at module scope: the client reads
    // DATABASE_URL at construction time, and on Cloudflare Workers that value
    // only exists once a request is being handled.
    globalForPrisma.prisma = new PrismaClient();
  }

  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    // No `receiver`: getters must see the real client as `this`, not the proxy.
    return Reflect.get(getClient(), prop);
  },
});
