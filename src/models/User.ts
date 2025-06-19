import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. User Schema & Model
export interface IUser extends Document {
  email: string;
  passwordHash: string;
  authProviders: ('email' | 'google' )[];
  role: 'member' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email:            { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash:     { type: String, required: false },
  authProviders:    { type: [String], enum: ['email','google','mobile'], default: ['email'] },
  role:             { type: String, enum: ['member','admin'], default: 'member' },
}, { timestamps: true });

export const User: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);