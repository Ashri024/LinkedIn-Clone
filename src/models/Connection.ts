import mongoose, { Document } from 'mongoose';
export type ConnectionStatus = 'pending' | 'accepted';

export interface IConnection extends Document {
  sender: mongoose.Types.ObjectId;     // who sent the request
  receiver: mongoose.Types.ObjectId;   // who receives the request
  status:ConnectionStatus;      // request status
  createdAt: Date;
  updatedAt: Date;
}

const connectionSchema = new mongoose.Schema<IConnection>(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
    status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
  },
  { timestamps: true }
);

// Prevent duplicate pending/accepted requests between same pair
connectionSchema.index({ sender: 1, receiver: 1 }, { unique: true });

export const Connection = mongoose.models.Connection || mongoose.model<IConnection>('Connection', connectionSchema);
