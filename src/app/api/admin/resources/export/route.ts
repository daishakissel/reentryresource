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
    .select("*, what_topics(name)")
    .order("title");

  if (!resources || resources.length === 0) {
    return NextResponse.json({ error: "No resources" }, { status: 404 });
  }

  // Fetch all junction data
  const [whereRes, whenRes, howRes, whoRes] = await Promise.all([
    client.from("resources_where_location_types").select("resource_id, where_location_type_id"),
    client.from("resources_when_times").select("resource_id, when_time_id"),
    client.from("resources_how_formats").select("resource_id, how_format_id"),
    client.from("resources_who_centerings").select("resource_id, who_centering_id"),
  ]);

  // Fetch lookup tables
  const [whereTypes, whenTimes, howFormats, whoCenterings] = await Promise.all([
    client.from("where_location_types").select("id, name"),
    client.from("when_times").select("id, name"),
    client.from("how_formats").select("id, name"),
    client.from("who_centerings").select("id, name"),
  ]);

  const whereLookup = Object.fromEntries((whereTypes.data ?? []).map((w: any) => [w.id, w.name]));
  const whenLookup = Object.fromEntries((whenTimes.data ?? []).map((w: any) => [w.id, w.name]));
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

  const whereMap = buildMap(whereRes.data ?? [], "where_location_type_id", whereLookup);
  const whenMap = buildMap(whenRes.data ?? [], "when_time_id", whenLookup);
  const howMap = buildMap(howRes.data ?? [], "how_format_id", howLookup);
  const whoMap = buildMap(whoRes.data ?? [], "who_centering_id", whoLookup);

  // Build CSV
  const headers = [
    "title", "slug", "organization_name", "facility_name",
    "description", "content", "featured_image",
    "what_topic",
    "where_location_types", "when_times", "how_formats", "who_centerings",
    "street_address", "city", "state", "zip", "region", "country",
    "latitude", "longitude",
    "phone", "email", "website",
    "created_by", "created_at", "updated_at",
  ];

  function esc(val: any): string {
    const str = String(val ?? "").replace(/"/g, '""');
    return `"${str}"`;
  }

  const rows = resources.map((r: any) => [
    esc(r.title), esc(r.slug), esc(r.organization_name), esc(r.facility_name),
    esc(r.description), esc(r.content), esc(r.featured_image),
    esc(r.what_topics?.name ?? ""),
    esc((whereMap[r.id] ?? []).join("; ")),
    esc((whenMap[r.id] ?? []).join("; ")),
    esc((howMap[r.id] ?? []).join("; ")),
    esc((whoMap[r.id] ?? []).join("; ")),
    esc(r.street_address), esc(r.city), esc(r.state), esc(r.zip), esc(r.region), esc(r.country),
    esc(r.latitude), esc(r.longitude),
    esc(r.phone), esc(r.email), esc(r.website),
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
