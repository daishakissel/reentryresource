import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      // Bypass Next.js fetch caching so filters always reflect the live DB
      global: { fetch: (input: any, init?: any) => fetch(input, { ...init, cache: "no-store" }) },
    }
  );

  const [whyRes, whatRes, whereRes, howRes, whoRes, whatWhyRes] = await Promise.all([
    client.from("elements").select("id, name, slug, definition, sort_order").order("sort_order"),
    client.from("categories").select("id, name, slug, sort_order").order("sort_order"),
    client.from("modes").select("id, name, definition, sort_order").order("sort_order"),
    client.from("formats").select("id, name, definition, sort_order").order("sort_order"),
    client.from("centerings").select("id, name, definition, sort_order").order("sort_order"),
    client.from("categories_elements").select("category_id, element_id"),
  ]);

  return NextResponse.json({
    elements: whyRes.data ?? [],
    categories: whatRes.data ?? [],
    modes: whereRes.data ?? [],
    formats: howRes.data ?? [],
    centerings: whoRes.data ?? [],
    categories_elements: whatWhyRes.data ?? [],
  });
}
