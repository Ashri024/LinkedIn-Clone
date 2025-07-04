// import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getFollowersCount } from "@/lib/db/backend/follower";

// GET /api/followers-count/:targetId
export async function GET(req: NextRequest, { params }: { params: { targetId: string } }) {
  const { targetId } = await params;
  try {
    await connectDB();
    const count = await getFollowersCount(targetId);
    return NextResponse.json({ success: true, count });
  } catch (err) {
    const ErrorMessage = err instanceof Error ? err.message : "Server error";
    
    return NextResponse.json({ error: ErrorMessage || "Failed to fetch followers count" }, { status: 500 });
  }
}