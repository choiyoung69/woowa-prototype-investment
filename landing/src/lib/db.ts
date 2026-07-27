import { sql } from "@vercel/postgres";

let tableReady = false;

export async function ensureSubscribersTable() {
  if (tableReady) return;

  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      source TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  tableReady = true;
}
