import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AdminSession } from "@/types/admin";

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || "fallback_dev_secret_please_change_in_env_2026"
);

const COOKIE_NAME =
  process.env.SESSION_COOKIE_NAME || "portfolio_admin_session";
const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

export async function createSessionToken(
  payload: AdminSession
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(SECRET_KEY);
}

export async function verifySessionToken(
  token: string
): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      id: payload.id as string,
      username: payload.username as string,
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(session: AdminSession): Promise<void> {
  const token = await createSessionToken(session);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentAdmin(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  return verifySessionToken(token);
}
