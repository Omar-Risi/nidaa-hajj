import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';
import { requireEnv } from '@/lib/env';

const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Resolved per call rather than at module scope: on Cloudflare Workers the
// environment is only populated once a request is in flight.
function getSecret() {
  return new TextEncoder().encode(requireEnv('JWT_SECRET'));
}

export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
}

export async function createSession(userId: string, email: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  
  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresAt)
    .sign(getSecret());

  return { token, expiresAt };
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    
    // Validate that required fields exist
    if (
      typeof payload.userId === 'string' &&
      typeof payload.email === 'string'
    ) {
      return payload as SessionPayload;
    }
    
    return null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  
  if (!token) return null;
  
  return verifySession(token);
}

export async function setSessionCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
