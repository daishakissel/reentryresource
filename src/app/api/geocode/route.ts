import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
    { headers: { "User-Agent": "ReentryResource/1.0" } }
  );

  const data = await res.json();
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "Address not found" }, { status: 404 });
  }

  return NextResponse.json({
    latitude: parseFloat(data[0].lat),
    longitude: parseFloat(data[0].lon),
    display_name: data[0].display_name,
  });
}
