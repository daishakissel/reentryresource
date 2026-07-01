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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = getAdmin();
  const { data } = await client
    .from("shelter_pages")
    .select("id, title, slug, sort_order, parent_id, created_at")
    .eq("shelter_id", params.id)
    .order("sort_order");

  return NextResponse.json({ pages: data ?? [] });
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, slug, content, sort_order, parent_id } = await req.json();
  if (!title || !slug) return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });

  const client = getAdmin();
  const { error } = await client.from("shelter_pages").insert({
    shelter_id: params.id,
    title,
    slug,
    content: content || "",
    sort_order: sort_order ?? 0,
    parent_id: parent_id || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
