import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const TAG_JUNCTIONS = [
  { label: "Mode", table: "resources_modes", fk: "mode_id", lookup: "modes" },
  { label: "Format", table: "resources_formats", fk: "format_id", lookup: "formats" },
  { label: "Centering", table: "resources_centerings", fk: "centering_id", lookup: "centerings" },
];

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const result: Record<string, string[]> = {};

  // Get WHAT topic and its elementies
  const { data: resource } = await client
    .from("resources")
    .select("category_id")
    .eq("id", params.id)
    .single();

  if (resource?.category_id) {
    const { data: topic } = await client
      .from("categories")
      .select("name")
      .eq("id", resource.category_id)
      .single();
    if (topic) result["Category"] = [topic.name];

  }

  // Get WHY from direct junction table
  const { data: whyLinks } = await client
    .from("resources_elements")
    .select("element_id")
    .eq("resource_id", params.id);
  if (whyLinks && whyLinks.length > 0) {
    const { data: whys } = await client
      .from("elements")
      .select("name")
      .in("id", whyLinks.map((l: any) => l.element_id));
    if (whys) result["Element"] = whys.map((w: any) => w.name);
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
