import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { password } = await req.json();
  if (!password) {
    return NextResponse.json({ error: "Password is required" }, { status: 400 });
  }

  const client = getClient();
  const { data: shelter } = await client
    .from("shelters")
    .select("id, password_hash")
    .eq("slug", params.slug)
    .single();

  if (!shelter) {
    return NextResponse.json({ error: "Shelter not found" }, { status: 404 });
  }

  if (!shelter.password_hash) {
    return NextResponse.json({ error: "Shelter password not set. Contact an admin." }, { status: 400 });
  }

  // Simple comparison — in production use bcrypt
  if (password !== shelter.password_hash) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  return NextResponse.json({ success: true, shelterId: shelter.id });
}
