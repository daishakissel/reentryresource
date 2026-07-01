import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const elementId = req.nextUrl.searchParams.get("elementId");

  const counts: Record<string, Record<string, number>> = {
    categories: {},
    modes: {},
    formats: {},
    centerings: {},
  };

  // If scoped to a element, get resource IDs directly from junction table
  let scopedResourceIds: Set<string> | null = null;

  if (elementId) {
    const { data: whyLinks } = await client
      .from("resources_elements")
      .select("resource_id")
      .eq("element_id", elementId);

    scopedResourceIds = new Set((whyLinks ?? []).map((l: any) => l.resource_id));

  }

  // Categories are now counted via junction table like other dimensions

  // Junction table counts (scoped if elementId provided)
  const junctions: { key: string; table: string; fk: string }[] = [
    { key: "categories", table: "resources_categories", fk: "category_id" },
    { key: "modes", table: "resources_modes", fk: "mode_id" },
    { key: "formats", table: "resources_formats", fk: "format_id" },
    { key: "centerings", table: "resources_centerings", fk: "centering_id" },
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
