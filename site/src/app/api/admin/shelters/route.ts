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

  const { name, short_name, slug, password, organization_name, phone, email, website, street_address, city, state, zip, latitude, longitude } = await req.json();
  if (!name || !slug || !password) {
    return NextResponse.json({ error: "Name, slug, and password are required" }, { status: 400 });
  }

  const client = getAdmin();
  const { error } = await client.from("shelters").insert({
    name, short_name: short_name || null, slug, password_hash: password,
    organization_name: organization_name || null, phone: phone || null,
    email: email || null, website: website || null,
    street_address: street_address || null, city: city || null,
    state: state || null, zip: zip || null,
    latitude: latitude ?? null, longitude: longitude ?? null,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
