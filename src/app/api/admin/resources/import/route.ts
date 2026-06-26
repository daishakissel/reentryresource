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

export async function POST(req: NextRequest) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { rows } = await req.json();
  if (!rows || !Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }

  const client = getAdmin();

  // Load lookup tables for name → ID matching
  const [topicsRes, whereRes, whenRes, howRes, whoRes] = await Promise.all([
    client.from("what_topics").select("id, name"),
    client.from("where_location_types").select("id, name"),
    client.from("when_times").select("id, name"),
    client.from("how_formats").select("id, name"),
    client.from("who_centerings").select("id, name"),
  ]);

  const topicLookup = Object.fromEntries((topicsRes.data ?? []).map((t: any) => [t.name.toLowerCase(), t.id]));
  const whereLookup = Object.fromEntries((whereRes.data ?? []).map((w: any) => [w.name.toLowerCase(), w.id]));
  const whenLookup = Object.fromEntries((whenRes.data ?? []).map((w: any) => [w.name.toLowerCase(), w.id]));
  const howLookup = Object.fromEntries((howRes.data ?? []).map((w: any) => [w.name.toLowerCase(), w.id]));
  const whoLookup = Object.fromEntries((whoRes.data ?? []).map((w: any) => [w.name.toLowerCase(), w.id]));

  function matchIds(value: string, lookup: Record<string, string>): string[] {
    if (!value) return [];
    return value.split(/[;,]/).map((v) => v.trim().toLowerCase()).filter(Boolean)
      .map((v) => lookup[v]).filter(Boolean);
  }

  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row.title) { skipped++; continue; }

    // Match what_topic by name
    const topicName = (row.what_topic || "").trim().toLowerCase();
    const what_topic_id = topicName ? (topicLookup[topicName] || null) : null;

    // Generate slug
    const slug = (row.slug || row.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    // Insert resource
    const { data: resource, error } = await client
      .from("resources")
      .insert({
        title: row.title,
        slug: slug + "-" + Date.now().toString(36).slice(-4),
        organization_name: row.organization_name || null,
        facility_name: row.facility_name || null,
        description: row.description || null,
        content: row.content || null,
        featured_image: row.featured_image || null,
        what_topic_id,
        street_address: row.street_address || null,
        city: row.city || null,
        state: row.state || null,
        zip: row.zip || null,
        region: row.region || null,
        country: row.country || null,
        latitude: row.latitude ? parseFloat(row.latitude) : null,
        longitude: row.longitude ? parseFloat(row.longitude) : null,
        phone: row.phone || null,
        email: row.email || null,
        website: row.website || null,
        created_by: row.created_by || caller.email || "",
        created_at: row.created_at || new Date().toISOString(),
        updated_at: row.updated_at || new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error || !resource) {
      errors.push(`Row ${i + 1} "${row.title}": ${error?.message || "unknown error"}`);
      continue;
    }

    // Insert junction table entries
    const whereIds = matchIds(row.where_location_types || "", whereLookup);
    const whenIds = matchIds(row.when_times || "", whenLookup);
    const howIds = matchIds(row.how_formats || "", howLookup);
    const whoIds = matchIds(row.who_centerings || "", whoLookup);

    if (whereIds.length > 0) {
      await client.from("resources_where_location_types").insert(
        whereIds.map((id) => ({ resource_id: resource.id, where_location_type_id: id }))
      );
    }
    if (whenIds.length > 0) {
      await client.from("resources_when_times").insert(
        whenIds.map((id) => ({ resource_id: resource.id, when_time_id: id }))
      );
    }
    if (howIds.length > 0) {
      await client.from("resources_how_formats").insert(
        howIds.map((id) => ({ resource_id: resource.id, how_format_id: id }))
      );
    }
    if (whoIds.length > 0) {
      await client.from("resources_who_centerings").insert(
        whoIds.map((id) => ({ resource_id: resource.id, who_centering_id: id }))
      );
    }

    // Auto-populate WHY categories from WHAT topic
    if (what_topic_id) {
      const { data: whyLinks } = await client
        .from("what_topics_why_categories")
        .select("why_category_id")
        .eq("what_topic_id", what_topic_id);
      if (whyLinks && whyLinks.length > 0) {
        await client.from("resources_why_categories").insert(
          whyLinks.map((l: any) => ({ resource_id: resource.id, why_category_id: l.why_category_id }))
        );
      }
    }

    imported++;
  }

  return NextResponse.json({ imported, skipped, errors });
}
