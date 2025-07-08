import { connectDB } from "@/lib/mongodb";
import { Connection } from "@/models/Connection";

//  Send Connection Request
export async function sendConnectionRequest(senderId: string, receiverId: string) {
    if (senderId === receiverId) throw new Error("You cannot connect with yourself.");
  
    await connectDB();
  
    // Check if connection already exists
    const existing = await Connection.findOne({
      sender: senderId,
      receiver: receiverId
    });
  
    if (existing) {
      if (existing.status === 'accepted') throw new Error("Already connected.");
      else throw new Error("Request already sent.");
    }
  
    await Connection.create({ sender: senderId, receiver: receiverId });
    return { success: true };
  }

//   Accept Connection Request
  export async function acceptConnectionRequest(receiverId: string, senderId: string) {
    await connectDB();
  
    const connection = await Connection.findOneAndUpdate(
      { sender: senderId, receiver: receiverId, status: 'pending' },
      { status: 'accepted' },
      { new: true }
    );
  
    if (!connection) throw new Error("No pending request found.");
  
    return { success: true };
  }
  
//  Withdraw Sent Request
  export async function withdrawRequest(senderId: string, receiverId: string) {
    await connectDB();
    const deleted = await Connection.findOneAndDelete({
      sender: senderId,
      receiver: receiverId,
      status: 'pending'
    });
  
    if (!deleted) throw new Error("No pending request to withdraw.");
    return { success: true };
  }
  
//    Reject Incoming Request
  export async function rejectRequest(receiverId: string, senderId: string) {
    await connectDB();
    const deleted = await Connection.findOneAndDelete({
      sender: senderId,
      receiver: receiverId,
      status: 'pending'
    });
  
    if (!deleted) throw new Error("No pending request to reject.");
    return { success: true };
  }
  
//   Remove Connection (Unfriend)
  export async function removeConnection(userId1: string, userId2: string) {
    await connectDB();
  
    const deleted = await Connection.findOneAndDelete({
      $or: [
        { sender: userId1, receiver: userId2, status: 'accepted' },
        { sender: userId2, receiver: userId1, status: 'accepted' }
      ]
    });
  
    if (!deleted) throw new Error("No connection found.");
    return { success: true };
  }

// Get All Connections of User
  export async function getConnectionsAll(userId: string) {
    await connectDB();
  
    const connections = await Connection.find({
      $or: [
        { sender: userId, },
        { receiver: userId, }
      ]
    }).populate('sender receiver');
    // console.log('Connections from backend:', connections);
    // Flatten into "connected user"
    return connections.map((c) =>
      String(c.sender._id) === userId ? {
        _id: c.receiver._id.toString(),
        firstName: c.receiver.firstName,
        lastName: c.receiver.lastName,
        headline: c.receiver.headline,
        profileImageUrl: c.receiver.profileImageUrl,
        status: c.status,
      } : {
        _id: c.sender._id.toString(),
        firstName: c.sender.firstName,
        lastName: c.sender.lastName,
        headline: c.sender.headline,
        profileImageUrl: c.sender.profileImageUrl,
        status: c.status,
      }
    );
  }
// Get All Connections of User
  export async function getConnections(userId: string) {
    await connectDB();
  
    const connections = await Connection.find({
      $or: [
        { sender: userId, status: 'accepted' },
        { receiver: userId, status: 'accepted' }
      ]
    }).populate('sender receiver');
    // console.log('Connections from backend:', connections);
    // Flatten into "connected user"
    return connections.map((c) =>
      String(c.sender._id) === userId ? c.receiver : c.sender
    );
  }
// Get All ConnectionsIds of User
  export async function getConnectionsIds(userId: string) {
    await connectDB();
  
    const connections = await Connection.find({
      $or: [
        { sender: userId, status: 'accepted' },
        { receiver: userId, status: 'accepted' }
      ]
    }).populate('sender receiver');

    // console.log('Connections from backend:', connections);
    // Flatten into "connected user"
    return connections.map((c) =>
      String(c.sender._id) === userId ? c.receiver._id.toString() : c.sender._id.toString()
    );
  }

// Get A single connection between two users
export async function getConnection(userId1: string, userId2: string) {
    await connectDB();
  
    const connection = await Connection.findOne({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 }
      ]
    }).populate('sender receiver');
  
    if (!connection) return { error: "No connection found.", status: undefined };
  
    return {
      _id: connection._id.toString(),
      sender: {
        _id: connection.sender._id.toString(),
        firstName: connection.sender.firstName,
        lastName: connection.sender.lastName,
        headline: connection.sender.headline,
        profileImageUrl: connection.sender.profileImageUrl
      },
      receiver: {
        _id: connection.receiver._id.toString(),
        firstName: connection.receiver.firstName,
        lastName: connection.receiver.lastName,
        headline: connection.receiver.headline,
        profileImageUrl: connection.receiver.profileImageUrl
      },
      status: connection.status
    };
  }

//  Get connection count of a user
export async function getConnectionCount(userId: string) {
    await connectDB();
  
    const count = await Connection.countDocuments({
      $or: [
        { sender: userId, status: 'accepted' },
        { receiver: userId, status: 'accepted' }
      ]
    });
  
    return count;
  }
  
//  Get Incoming Requests (Pending for Me)
  export async function getIncomingRequests(userId: string) {
    await connectDB();
    const requests = await Connection.find({
      receiver: userId,
      status: 'pending'
    }).populate('sender');
    
    return requests.map(r => r.sender);
  }
  
// Get Sent Requests (Pending Sent by Me)
  export async function getSentRequests(userId: string) {
    await connectDB();
    const requests = await Connection.find({
      sender: userId,
      status: 'pending'
    }).populate('receiver');
  
    return requests.map(r => r.receiver);
  }
  