import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
    profileId: mongoose.Types.ObjectId;
    companyId: mongoose.Types.ObjectId;
    employmentType?: 'full time'|'part time'|'self employed'|'freelance'|'internship'|'trainee';
    locationType?: 'on-site'|'remote'|'hybrid';
    positions: Array<{
      title: string;
      start?: { month: number; year: number };
      end?: { month: number; year: number };
      location?: string;
      description?: string;
      skills?: mongoose.Types.ObjectId[];
    }>;
  }
  
  const ExperienceSchema = new Schema<IExperience>({
    profileId:     { type: Schema.Types.ObjectId, ref: 'Profile', required: true, index: true },
    companyId:     { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    employmentType:{ type: String, enum: ['full time','part time','self employed','freelance','internship','trainee']},
    locationType:  { type: String, enum: ['on-site','remote','hybrid'] },
    positions:     [{
      title:       { type: String, required: true },
      start:       { 
        month:    { type: Number, min:1, max:12, },
        year:     { type: Number, min:1900, }
      },
      end:         {
        month:    { type: Number, min:1, max:12, },
        year:     { type: Number, min:1900, },
      },
      location:    { type: String },
      description: { type: String },
      skills:      [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
    }]
  }, { timestamps: true });
  
  export const Experience: Model<IExperience> = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema);