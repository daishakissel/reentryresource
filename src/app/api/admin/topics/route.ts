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
    client.from("categories").select("id, name, slug, sort_order").order("sort_order"),
    client.from("categories_elements").select("category_id, element_id"),
    client.from("resources_categories").select("resource_id, category_id"),
    client.from("elements").select("id, name, slug").order("sort_order"),
  ]);

  const topics = topicsRes.data ?? [];
  const mappings = mappingsRes.data ?? [];
  const resources = resourcesRes.data ?? [];
  const elementCategories = whyRes.data ?? [];

  // Count resources per topic (via junction table)
  const resourceCounts: Record<string, number> = {};
  resources.forEach((r: any) => {
    if (r.category_id) {
      resourceCounts[r.category_id] = (resourceCounts[r.category_id] || 0) + 1;
    }
  });


  // Group elementies per topic
  const topicWhys: Record<string, string[]> = {};
  const whyLookup = Object.fromEntries(elementCategories.map((w: any) => [w.id, w.name]));
  mappings.forEach((m: any) => {
    if (!topicWhys[m.category_id]) topicWhys[m.category_id] = [];
    topicWhys[m.category_id].push(whyLookup[m.element_id] || "?");
  });

  const topicWhyIds: Record<string, string[]> = {};
  mappings.forEach((m: any) => {
    if (!topicWhyIds[m.category_id]) topicWhyIds[m.category_id] = [];
    topicWhyIds[m.category_id].push(m.element_id);
  });

  const result = topics.map((t: any) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    sort_order: t.sort_order,
    resource_count: resourceCounts[t.id] || 0,
    element_names: topicWhys[t.id] || [],
    element_ids_list: topicWhyIds[t.id] || [],
  }));

  return NextResponse.json({ topics: result, elements: elementCategories });
}

export async function POST(req: NextRequest) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, slug, element_ids } = await req.json();
  if (!name || !slug) return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
  if (!element_ids || element_ids.length === 0) {
    return NextResponse.json({ error: "At least one element is required" }, { status: 400 });
  }

  const client = getAdmin();

  const { data: topic, error } = await client
    .from("categories")
    .insert({ name, slug, sort_order: 0 })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Insert WHY mappings
  const rows = element_ids.map((whyId: string) => ({
    category_id: topic.id,
    element_id: whyId,
  }));
  await client.from("categories_elements").insert(rows);

  return NextResponse.json({ success: true, id: topic.id });
}
