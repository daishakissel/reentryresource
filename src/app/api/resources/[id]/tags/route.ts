import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const TAG_JUNCTIONS = [
  { label: "Where", table: "resources_where_location_types", fk: "where_location_type_id", lookup: "where_location_types" },
  { label: "When", table: "resources_when_times", fk: "when_time_id", lookup: "when_times" },
  { label: "How", table: "resources_how_formats", fk: "how_format_id", lookup: "how_formats" },
  { label: "Who", table: "resources_who_centerings", fk: "who_centering_id", lookup: "who_centerings" },
];

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const result: Record<string, string[]> = {};

  // Get WHAT topic and its WHY categories
  const { data: resource } = await client
    .from("resources")
    .select("what_topic_id")
    .eq("id", params.id)
    .single();

  if (resource?.what_topic_id) {
    const { data: topic } = await client
      .from("what_topics")
      .select("name")
      .eq("id", resource.what_topic_id)
      .single();
    if (topic) result["What"] = [topic.name];

    const { data: whyLinks } = await client
      .from("what_topics_why_categories")
      .select("why_category_id")
      .eq("what_topic_id", resource.what_topic_id);
    if (whyLinks && whyLinks.length > 0) {
      const { data: whys } = await client
        .from("why_categories")
        .select("name")
        .in("id", whyLinks.map((l: any) => l.why_category_id));
      if (whys) result["Why"] = whys.map((w: any) => w.name);
    }
  }

  // Get junction table tags
  await Promise.all(
    TAG_JUNCTIONS.map(async (j) => {
      const { data: links } = await client
        .from(j.table)
        .select(j.fk)
        .eq("resource_id", params.id);
      if (links && links.length > 0) {
        const ids = links.map((l: Record<string, string>) => l[j.fk]);
        const { data: names } = await client.from(j.lookup).select("name").in("id", ids);
        const nameList = names?.map((n: { name: string }) => n.name) ?? [];
        if (nameList.length > 0) result[j.label] = nameList;
      }
    })
  );

  return NextResponse.json(result);
}
