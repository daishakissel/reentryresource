import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { resourceSlug as buildResourceSlug } from "@/lib/slug";

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
  category_ids: { table: "resources_categories", fk: "category_id" },
  mode_ids: { table: "resources_modes", fk: "mode_id" },
  format_ids: { table: "resources_formats", fk: "format_id" },
  centering_ids: { table: "resources_centerings", fk: "centering_id" },
};

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const {
    title, slug, organization_name, facility_name, description, engage, content, featured_image,
    expiration_date,
    street_address, city, state, zip, region, country,
    latitude, longitude, phone, email, website,
    ...junctionData
  } = body;

  const client = getAdmin();

  const { error } = await client
    .from("resources")
    .update({
      title,
      slug: slug || buildResourceSlug(organization_name, title),
      organization_name: organization_name || null,
      facility_name: facility_name || null,
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
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  for (const [key, config] of Object.entries(JUNCTION_TABLES)) {
    await client.from(config.table).delete().eq("resource_id", params.id);
    const ids: string[] = junctionData[key] ?? [];
    if (ids.length > 0) {
      const rows = ids.map((id) => ({ resource_id: params.id, [config.fk]: id }));
      await client.from(config.table).insert(rows);
    }
  }

  // Re-populate elements from all assigned categories
  await client.from("resources_elements").delete().eq("resource_id", params.id);
  const categoryIds: string[] = junctionData.category_ids ?? [];
  if (categoryIds.length > 0) {
    const { data: whyLinks } = await client
      .from("categories_elements")
      .select("element_id")
      .in("category_id", categoryIds);
    if (whyLinks && whyLinks.length > 0) {
      const uniqueElementIds = [...new Set(whyLinks.map((l: any) => l.element_id))];
      const whyRows = uniqueElementIds.map((eid) => ({
        resource_id: params.id,
        element_id: eid,
      }));
      await client.from("resources_elements").insert(whyRows);
    }
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = getAdmin();
  const { error } = await client.from("resources").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
