import { authOptions } from "@/lib/authOptions";
import { isFollowing } from "@/lib/db/backend/follower";
import { connectDB } from "@/lib/mongodb";
import { Follow } from "@/models/Follow";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Check if a user is following another user
export async function GET(req: NextRequest, { params }: { params: Promise<{ targetId: string }> }) {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?._id;
    const {targetId} = await params;

    if (!currentUserId || currentUserId === targetId) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    try {
      await connectDB();
      const follow = await isFollowing(currentUserId, targetId);
      return NextResponse.json({ isFollowing: follow.isFollowing }, { status: 200 });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Server error";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

// POST /api/follow/:targetId
export async function POST(req: NextRequest, { params }: { params: Promise<{ targetId: string }> }) {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?._id;
    const {targetId} = await params;
  
    if (!currentUserId || currentUserId === targetId) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  
    try {
      await connectDB();
      const res= await Follow.create({ follower: currentUserId, following: targetId });
      return NextResponse.json({ success: true, data:res });
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((err as any).code === 11000) { 
        return NextResponse.json({ error: "Already following" }, { status: 409 });
      }
      return NextResponse.json({ error: "Failed to follow" }, { status: 500 });
    }
  }

  // DELETE /api/follow/:targetId
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ targetId: string }> }) {
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?._id;
    const {targetId} = await params;
  
    if (!currentUserId || currentUserId === targetId) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  
    try {
      await connectDB();
      await Follow.deleteOne({ follower: currentUserId, following: targetId });
      return NextResponse.json({ success: true });
    } catch (err) {
        const ErrorMessage = err instanceof Error ? err.message : "Server error";
      return NextResponse.json({ error:ErrorMessage || "Failed to unfollow" }, { status: 500 });
    }
  }
  
  