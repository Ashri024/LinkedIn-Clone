import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

let apiCall = 0;

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  console.log('apiCall /profile/userId: ', ++apiCall);
  const { userId } = await params;

  try {
    await connectDB();

    const profile = await Profile.findById(userId);

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    // console.log("Fetched profile in /userid/route.ts :", profile);
    return NextResponse.json(profile);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch profile";
    console.error("❌ Error in GET /profile/[userId]:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
