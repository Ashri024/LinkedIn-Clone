import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { removeConnection } from "@/lib/db/backend/connection";

export async function DELETE(request: NextRequest, { params }: { params: { receiverId: string } }) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id;
    const {receiverId} = await params;
  
    if (!userId || !receiverId) {
      return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
    }
  
    // Try to remove connection, if not found, try to withdraw request
    try {
      await removeConnection(userId, receiverId);
      return NextResponse.json({ success: true, action: 'removed' });
    } catch(err) {
        const errMessage = err instanceof Error ? err.message : 'An error occurred';
        return NextResponse.json({ error: errMessage }, { status: 400 });
    }
  }