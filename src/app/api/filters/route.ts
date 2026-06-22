import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const [
    whyRes,
    whatRes,
    whereRes,
    whenRes,
    howRes,
    whoRes,
    whatWhyRes,
  ] = await Promise.all([
    client.from("why_categories").select("id, name, slug, definition, sort_order").order("sort_order"),
    client.from("what_topics").select("id, name, slug, sort_order").order("sort_order"),
    client.from("where_location_types").select("id, name, definition, sort_order").order("sort_order"),
    client.from("when_times").select("id, name, definition, sort_order").order("sort_order"),
    client.from("how_formats").select("id, name, definition, sort_order").order("sort_order"),
    client.from("who_centerings").select("id, name, definition, sort_order").order("sort_order"),
    client.from("what_topics_why_categories").select("what_topic_id, why_category_id"),
  ]);

  return NextResponse.json({
    why_categories: whyRes.data ?? [],
    what_topics: whatRes.data ?? [],
    where_location_types: whereRes.data ?? [],
    when_times: whenRes.data ?? [],
    how_formats: howRes.data ?? [],
    who_centerings: whoRes.data ?? [],
    what_topics_why_categories: whatWhyRes.data ?? [],
  });
}
