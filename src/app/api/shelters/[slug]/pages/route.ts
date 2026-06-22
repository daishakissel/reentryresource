import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const client = getClient();

  const { data: shelter } = await client
    .from("shelters")
    .select("id")
    .eq("slug", params.slug)
    .single();

  if (!shelter) {
    return NextResponse.json({ error: "Shelter not found" }, { status: 404 });
  }

  const { data: pages } = await client
    .from("shelter_pages")
    .select("id, title, slug, content, sort_order, parent_id")
    .eq("shelter_id", shelter.id)
    .order("sort_order");

  return NextResponse.json({ pages: pages ?? [] });
}
