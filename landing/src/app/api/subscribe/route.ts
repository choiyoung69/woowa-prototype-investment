import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ensureSubscribersTable } from "@/lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_BODY" }, { status: 400 });
  }

  const { email, company, source } = body as {
    email?: unknown;
    company?: unknown;
    source?: unknown;
  };

  // Honeypot field: real users never fill this in, so treat a filled value as a bot
  // and respond as if it succeeded to avoid tipping the bot off.
  if (typeof company === "string" && company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
  }

  const normalizedSource = typeof source === "string" ? source.slice(0, 50) : null;

  try {
    await ensureSubscribersTable();
    await sql`
      INSERT INTO subscribers (email, source)
      VALUES (${normalizedEmail}, ${normalizedSource})
      ON CONFLICT (email) DO NOTHING;
    `;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("subscribe error", error);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}
