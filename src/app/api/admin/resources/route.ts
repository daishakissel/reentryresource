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

const JUNCTION_TABLES: Record<string, { table: string; fk: string }> = {
  where_location_type_ids: { table: "resources_where_location_types", fk: "where_location_type_id" },
  when_time_ids: { table: "resources_when_times", fk: "when_time_id" },
  how_format_ids: { table: "resources_how_formats", fk: "how_format_id" },
  who_centering_ids: { table: "resources_who_centerings", fk: "who_centering_id" },
};

export async function POST(req: NextRequest) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    title, slug, description, engage, content, featured_image,
    expiration_date,
    street_address, city, state, zip, region, country,
    latitude, longitude, phone, email, website,
    what_topic_id,
    ...junctionData
  } = body;

  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  const resourceSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const client = getAdmin();

  const { data: resource, error } = await client
    .from("resources")
    .insert({
      title,
      slug: resourceSlug,
      description: description || null,
      engage: engage || null,
      content: content || null,
      expiration_date: expiration_date || null,
      featured_image: featured_image || null,
      street_address: street_address || null,
      city: city || null,
      state: state || null,
      zip: zip || null,
      region: region || null,
      country: country || null,
      latitude: latitude ? parseFloat(latitude) : null,
      longitude: longitude ? parseFloat(longitude) : null,
      phone: phone || null,
      email: email || null,
      website: website || null,
      what_topic_id: what_topic_id || null,
      created_by: caller.id,
    })
    .select("id")
    .single();

  if (error || !resource) {
    return NextResponse.json({ error: error?.message ?? "Failed to create resource" }, { status: 500 });
  }

  for (const [key, config] of Object.entries(JUNCTION_TABLES)) {
    const ids: string[] = junctionData[key] ?? [];
    if (ids.length > 0) {
      const rows = ids.map((id) => ({ resource_id: resource.id, [config.fk]: id }));
      await client.from(config.table).insert(rows);
    }
  }

  // Auto-populate WHY categories from WHAT topic
  if (what_topic_id) {
    const { data: whyLinks } = await client
      .from("what_topics_why_categories")
      .select("why_category_id")
      .eq("what_topic_id", what_topic_id);
    if (whyLinks && whyLinks.length > 0) {
      const whyRows = whyLinks.map((l: any) => ({
        resource_id: resource.id,
        why_category_id: l.why_category_id,
      }));
      await client.from("resources_why_categories").insert(whyRows);
    }
  }

  return NextResponse.json({ id: resource.id });
}
