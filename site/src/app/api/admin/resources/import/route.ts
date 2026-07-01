import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import { resourceSlug } from "@/lib/slug";

function md5(str: string): string {
  return createHash("md5").update(str).digest("hex");
}

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
  const [topicsRes, whereRes, howRes, whoRes] = await Promise.all([
    client.from("categories").select("id, name"),
    client.from("modes").select("id, name"),
    client.from("formats").select("id, name"),
    client.from("centerings").select("id, name"),
  ]);

  const topicLookup = Object.fromEntries((topicsRes.data ?? []).map((t: any) => [t.name.toLowerCase(), t.id]));
  const whereLookup = Object.fromEntries((whereRes.data ?? []).map((w: any) => [w.name.toLowerCase(), w.id]));
  const howLookup = Object.fromEntries((howRes.data ?? []).map((w: any) => [w.name.toLowerCase(), w.id]));
  const whoLookup = Object.fromEntries((whoRes.data ?? []).map((w: any) => [w.name.toLowerCase(), w.id]));

  function matchIds(value: string, lookup: Record<string, string>): string[] {
    if (!value) return [];
    return value.split(";").map((v) => v.trim().toLowerCase()).filter(Boolean)
      .map((v) => lookup[v]).filter(Boolean);
  }

  // Load existing slugs so we can guarantee uniqueness across imports
  const { data: existingSlugRows } = await client.from("resources").select("slug");
  const usedSlugs = new Set<string>((existingSlugRows ?? []).map((r: any) => r.slug).filter(Boolean));

  function uniqueSlug(base: string): string {
    let candidate = base || "resource";
    let n = 2;
    while (usedSlugs.has(candidate)) {
      candidate = `${base}-${n}`;
      n++;
    }
    usedSlugs.add(candidate);
    return candidate;
  }

  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row.title) { skipped++; continue; }

    // Match categories by name (semicolon-separated)
    const categoryIds = matchIds(row.category || "", topicLookup);

    // Slug: full organization name first, then title (unique across the DB)
    const slug = uniqueSlug(row.slug ? row.slug : resourceSlug(row.organization_name, row.title));

    // Hash the scraped content so we can detect changes on re-scrape
    const contentToHash = [row.title, row.description, row.content, row.engage].filter(Boolean).join("\n");
    const content_hash = md5(contentToHash);

    // Insert resource
    const { data: resource, error } = await client
      .from("resources")
      .insert({
        title: row.title,
        slug: slug,
        organization_name: row.organization_name || null,
        facility_name: row.facility_name || null,
        description: row.description || null,
        engage: row.engage || null,
        content: row.content || null,
        featured_image: row.featured_image || null,
        expiration_date: row.expiration_date || null,
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
        source_url: row.source_url || row.website || null,
        scraped_url: row.scraped_url || null,
        scraped_at: row.scraped_at || new Date().toISOString(),
        last_verified_at: new Date().toISOString(),
        scrape_status: "active",
        content_hash: content_hash,
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
    if (categoryIds.length > 0) {
      await client.from("resources_categories").insert(
        categoryIds.map((id) => ({ resource_id: resource.id, category_id: id }))
      );
    }

    const whereIds = matchIds(row.modes || "", whereLookup);
    const howIds = matchIds(row.formats || "", howLookup);
    const whoIds = matchIds(row.centerings || "", whoLookup);

    if (whereIds.length > 0) {
      await client.from("resources_modes").insert(
        whereIds.map((id) => ({ resource_id: resource.id, mode_id: id }))
      );
    }
    if (howIds.length > 0) {
      await client.from("resources_formats").insert(
        howIds.map((id) => ({ resource_id: resource.id, format_id: id }))
      );
    }
    if (whoIds.length > 0) {
      await client.from("resources_centerings").insert(
        whoIds.map((id) => ({ resource_id: resource.id, centering_id: id }))
      );
    }

    // Auto-populate elements from all assigned categories
    if (categoryIds.length > 0) {
      const { data: whyLinks } = await client
        .from("categories_elements")
        .select("element_id")
        .in("category_id", categoryIds);
      if (whyLinks && whyLinks.length > 0) {
        const uniqueElementIds = [...new Set(whyLinks.map((l: any) => l.element_id))];
        await client.from("resources_elements").insert(
          uniqueElementIds.map((eid) => ({ resource_id: resource.id, element_id: eid }))
        );
      }
    }

    imported++;
  }

  return NextResponse.json({ imported, skipped, errors });
}
