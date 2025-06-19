import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
    profileId: mongoose.Types.ObjectId;
    name: string;
    usedIn: string[];     // contexts or project names where used
    endorsedBy: mongoose.Types.ObjectId[];
  }
  
  const SkillSchema = new Schema<ISkill>({
    profileId:  { type: Schema.Types.ObjectId, ref: 'Profile', required: true, index: true },
    name:       { type: String, required: true, trim: true },
    usedIn:     [{ type: String }],
    endorsedBy: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  }, { timestamps: true });
  
  export const Skill: Model<ISkill> = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
  