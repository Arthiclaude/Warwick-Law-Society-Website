import { NextResponse } from "next/server";
import { checkIsMember } from "@/lib/warwickSu";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/session";

const SESSION_LENGTH_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function POST(request) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Server is not configured (missing SESSION_SECRET)." },
      { status: 500 }
    );
  }

  let personKey;
  try {
    ({ personKey } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!personKey || typeof personKey !== "string" || !personKey.trim()) {
    return NextResponse.json(
      { error: "Please enter your membership key." },
      { status: 400 }
    );
  }

  let isMember;
  try {
    isMember = await checkIsMember(personKey.trim());
  } catch (err) {
    console.error("Warwick SU membership check failed:", err);
    return NextResponse.json(
      { error: "Could not verify membership right now. Please try again shortly." },
      { status: 502 }
    );
  }

  if (!isMember) {
    return NextResponse.json(
      { error: "We couldn't verify an active Warwick Law Society membership for that key." },
      { status: 401 }
    );
  }

  const token = await createSessionToken(
    { expiresAt: Date.now() + SESSION_LENGTH_MS },
    secret
  );

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_LENGTH_MS / 1000,
  });
  return response;
}
