import { Profile } from "@/models/Profile";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Get all users except the current user
export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const currentUserEmail = session.user.email;
    const users = await Profile.find({ email: { $ne: currentUserEmail } })
      .select("firstName lastName profileImageUrl email headline")
      .lean();

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    const ErrorMessage = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ message: ErrorMessage || "Server error" }, { status: 500 });
  }
}
