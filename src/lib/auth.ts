import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface SessionPayload {
  userId: string;
  email: string;
  exp?: number;
}

export async function createSession(userId: string, email: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  
  const token = await new SignJWT({ userId, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresAt)
    .sign(secret);

  return { token, expiresAt };
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('session')?.value;
  
  if (!token) return null;
  
  return verifySession(token);
}

export async function setSessionCookie(token: string, expiresAt: Date) {
  const cookieStore = cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function deleteSession() {
  const cookieStore = cookies();
  cookieStore.delete('session');
}
