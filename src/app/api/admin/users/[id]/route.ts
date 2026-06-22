import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

async function verifyAuth(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data: { user } } = await client.auth.getUser(authHeader.replace("Bearer ", ""));
  return user;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const caller = await verifyAuth(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (params.id === caller.id) {
    return NextResponse.json({ error: "You cannot delete yourself" }, { status: 400 });
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { error } = await admin.auth.admin.deleteUser(params.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
