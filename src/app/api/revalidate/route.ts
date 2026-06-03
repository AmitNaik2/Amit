import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/game/[id]", "page");
  revalidatePath("/", "layout");
  revalidatePath("/free-games");

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
    message: "All game pages cache cleared"
  });
}
