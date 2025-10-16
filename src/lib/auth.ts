import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface SessionPayload extends JWTPayload {
  userId: string;
  email: string;
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
