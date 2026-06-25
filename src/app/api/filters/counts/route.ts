import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const whyCategoryId = req.nextUrl.searchParams.get("whyCategoryId");

  const counts: Record<string, Record<string, number>> = {
    what_topics: {},
    where_location_types: {},
    when_times: {},
    how_formats: {},
    who_centerings: {},
  };

  // If scoped to a WHY category, get resource IDs directly from junction table
  let scopedResourceIds: Set<string> | null = null;

  if (whyCategoryId) {
    const { data: whyLinks } = await client
      .from("resources_why_categories")
      .select("resource_id")
      .eq("why_category_id", whyCategoryId);

    scopedResourceIds = new Set((whyLinks ?? []).map((l: any) => l.resource_id));

    // Count WHAT topics within scope
    if (scopedResourceIds.size > 0) {
      const { data: resources } = await client
        .from("resources")
        .select("what_topic_id")
        .in("id", Array.from(scopedResourceIds));
      if (resources) {
        for (const r of resources) {
          if (r.what_topic_id) {
            counts.what_topics[r.what_topic_id] = (counts.what_topics[r.what_topic_id] || 0) + 1;
          }
        }
      }
    }
  } else {
    // Count all resources per topic
    const { data: resources } = await client.from("resources").select("what_topic_id");
    if (resources) {
      for (const r of resources) {
        if (r.what_topic_id) {
          counts.what_topics[r.what_topic_id] = (counts.what_topics[r.what_topic_id] || 0) + 1;
        }
      }
    }
  }

  // Junction table counts (scoped if whyCategoryId provided)
  const junctions: { key: string; table: string; fk: string }[] = [
    { key: "where_location_types", table: "resources_where_location_types", fk: "where_location_type_id" },
    { key: "when_times", table: "resources_when_times", fk: "when_time_id" },
    { key: "how_formats", table: "resources_how_formats", fk: "how_format_id" },
    { key: "who_centerings", table: "resources_who_centerings", fk: "who_centering_id" },
  ];

  await Promise.all(
    junctions.map(async (j) => {
      let query = client.from(j.table).select("*");
      if (scopedResourceIds) {
        query = query.in("resource_id", Array.from(scopedResourceIds));
      }
      const { data } = await query;
      if (data) {
        for (const row of data) {
          const id = (row as unknown as Record<string, string>)[j.fk];
          counts[j.key][id] = (counts[j.key][id] || 0) + 1;
        }
      }
    })
  );

  return NextResponse.json(counts);
}
