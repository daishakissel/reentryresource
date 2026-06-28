import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function verifyAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data: { user } } = await client.auth.getUser(authHeader.replace("Bearer ", ""));
  return user;
}

export async function GET(req: NextRequest) {
  const caller = await verifyAuth(req);
  if (!caller) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  // Fetch resources with topic name
  const { data: resources } = await client
    .from("resources")
    .select("*, categories(name)")
    .order("title");

  if (!resources || resources.length === 0) {
    return NextResponse.json({ error: "No resources" }, { status: 404 });
  }

  // Fetch all junction data
  const [whereRes, howRes, whoRes] = await Promise.all([
    client.from("resources_modes").select("resource_id, mode_id"),
    client.from("resources_formats").select("resource_id, format_id"),
    client.from("resources_centerings").select("resource_id, centering_id"),
  ]);

  // Fetch lookup tables
  const [whereTypes, howFormats, whoCenterings] = await Promise.all([
    client.from("modes").select("id, name"),
    client.from("formats").select("id, name"),
    client.from("centerings").select("id, name"),
  ]);

  const whereLookup = Object.fromEntries((whereTypes.data ?? []).map((w: any) => [w.id, w.name]));
  const howLookup = Object.fromEntries((howFormats.data ?? []).map((w: any) => [w.id, w.name]));
  const whoLookup = Object.fromEntries((whoCenterings.data ?? []).map((w: any) => [w.id, w.name]));

  // Build junction maps (resource_id → comma-separated names)
  function buildMap(rows: any[], fk: string, lookup: Record<string, string>) {
    const map: Record<string, string[]> = {};
    rows.forEach((row: any) => {
      const name = lookup[row[fk]];
      if (name) {
        if (!map[row.resource_id]) map[row.resource_id] = [];
        map[row.resource_id].push(name);
      }
    });
    return map;
  }

  const whereMap = buildMap(whereRes.data ?? [], "mode_id", whereLookup);
  const howMap = buildMap(howRes.data ?? [], "format_id", howLookup);
  const whoMap = buildMap(whoRes.data ?? [], "centering_id", whoLookup);

  // Build CSV
  const headers = [
    "title", "slug", "organization_name", "facility_name",
    "description", "engage", "content", "featured_image",
    "category",
    "modes", "formats", "centerings",
    "street_address", "city", "state", "zip", "region", "country",
    "latitude", "longitude",
    "phone", "email", "website",
    "expiration_date",
    "created_by", "created_at", "updated_at",
  ];

  function esc(val: any): string {
    const str = String(val ?? "").replace(/"/g, '""');
    return `"${str}"`;
  }

  const rows = resources.map((r: any) => [
    esc(r.title), esc(r.slug), esc(r.organization_name), esc(r.facility_name),
    esc(r.description), esc(r.engage), esc(r.content), esc(r.featured_image),
    esc(r.categories?.name ?? ""),
    esc((whereMap[r.id] ?? []).join("; ")),
    esc((howMap[r.id] ?? []).join("; ")),
    esc((whoMap[r.id] ?? []).join("; ")),
    esc(r.street_address), esc(r.city), esc(r.state), esc(r.zip), esc(r.region), esc(r.country),
    esc(r.latitude), esc(r.longitude),
    esc(r.phone), esc(r.email), esc(r.website),
    esc(r.expiration_date),
    esc(r.created_by), esc(r.created_at), esc(r.updated_at),
  ].join(","));

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="resources-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  });
}
