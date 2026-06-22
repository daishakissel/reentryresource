import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function verifyAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data: { user } } = await client.auth.getUser(authHeader.replace("Bearer ", ""));
  return user;
}

function getAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function GET(req: NextRequest) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = getAdmin();
  const { data } = await client.from("shelters").select("id, name, slug, created_at").order("name");
  return NextResponse.json({ shelters: data ?? [] });
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, slug, password } = await req.json();
  if (!name || !slug || !password) {
    return NextResponse.json({ error: "Name, slug, and password are required" }, { status: 400 });
  }

  const client = getAdmin();
  const { error } = await client.from("shelters").insert({ name, slug, password_hash: password });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
