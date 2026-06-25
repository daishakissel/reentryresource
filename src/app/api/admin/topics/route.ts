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

  const [topicsRes, mappingsRes, resourcesRes, whyRes] = await Promise.all([
    client.from("what_topics").select("id, name, slug, sort_order").order("sort_order"),
    client.from("what_topics_why_categories").select("what_topic_id, why_category_id"),
    client.from("resources").select("what_topic_id"),
    client.from("why_categories").select("id, name, slug").order("sort_order"),
  ]);

  const topics = topicsRes.data ?? [];
  const mappings = mappingsRes.data ?? [];
  const resources = resourcesRes.data ?? [];
  const whyCategories = whyRes.data ?? [];

  // Count resources per topic
  const resourceCounts: Record<string, number> = {};
  resources.forEach((r: any) => {
    if (r.what_topic_id) {
      resourceCounts[r.what_topic_id] = (resourceCounts[r.what_topic_id] || 0) + 1;
    }
  });

  // Group WHY categories per topic
  const topicWhys: Record<string, string[]> = {};
  const whyLookup = Object.fromEntries(whyCategories.map((w: any) => [w.id, w.name]));
  mappings.forEach((m: any) => {
    if (!topicWhys[m.what_topic_id]) topicWhys[m.what_topic_id] = [];
    topicWhys[m.what_topic_id].push(whyLookup[m.why_category_id] || "?");
  });

  const topicWhyIds: Record<string, string[]> = {};
  mappings.forEach((m: any) => {
    if (!topicWhyIds[m.what_topic_id]) topicWhyIds[m.what_topic_id] = [];
    topicWhyIds[m.what_topic_id].push(m.why_category_id);
  });

  const result = topics.map((t: any) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    sort_order: t.sort_order,
    resource_count: resourceCounts[t.id] || 0,
    why_names: topicWhys[t.id] || [],
    why_ids: topicWhyIds[t.id] || [],
  }));

  return NextResponse.json({ topics: result, why_categories: whyCategories });
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, slug, why_category_ids } = await req.json();
  if (!name || !slug) return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  if (!why_category_ids || why_category_ids.length === 0) {
    return NextResponse.json({ error: "At least one WHY category is required" }, { status: 400 });
  }

  const client = getAdmin();

  const { data: topic, error } = await client
    .from("what_topics")
    .insert({ name, slug, sort_order: 0 })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Insert WHY mappings
  const rows = why_category_ids.map((whyId: string) => ({
    what_topic_id: topic.id,
    why_category_id: whyId,
  }));
  await client.from("what_topics_why_categories").insert(rows);

  return NextResponse.json({ success: true, id: topic.id });
}
