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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, slug, why_category_ids } = await req.json();
  if (!name || !slug) return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  if (!why_category_ids || why_category_ids.length === 0) {
    return NextResponse.json({ error: "At least one WHY category is required" }, { status: 400 });
  }

  const client = getAdmin();

  const { error } = await client
    .from("what_topics")
    .update({ name, slug })
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Replace WHY mappings
  await client.from("what_topics_why_categories").delete().eq("what_topic_id", params.id);
  const rows = why_category_ids.map((whyId: string) => ({
    what_topic_id: params.id,
    why_category_id: whyId,
  }));
  await client.from("what_topics_why_categories").insert(rows);

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = getAdmin();

  // Check if any resources use this topic
  const { count } = await client
    .from("resources")
    .select("id", { count: "exact", head: true })
    .eq("what_topic_id", params.id);

  if (count && count > 0) {
    return NextResponse.json({
      error: `Cannot delete: ${count} resource${count > 1 ? "s" : ""} use this topic. Reassign them first.`,
    }, { status: 400 });
  }

  // Delete WHY mappings first, then the topic
  await client.from("what_topics_why_categories").delete().eq("what_topic_id", params.id);
  const { error } = await client.from("what_topics").delete().eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
