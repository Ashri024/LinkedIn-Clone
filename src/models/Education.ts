import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEducation extends Document {
    profileId: mongoose.Types.ObjectId;
    school: string;
    degree: string;
    fieldOfStudy: string;
    period: {
      start: { month: number; year: number };
      end?: { month: number; year: number };
    };
    grade?: string;
    description?: string;
    activities?: string;
    skills: mongoose.Types.ObjectId[];
  }
  
  const EducationSchema = new Schema<IEducation>({
    profileId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true, index: true },
    school:    { type: String, required: true },
    degree:    { type: String, required: true },
    fieldOfStudy:{ type: String },
    period:    {
      start: {
        month: { type: Number, min:1, max:12 },
        year:  { type: Number, min:1900 }
      },
      end: {
        month: { type: Number, min:1, max:12 },
        year:  { type: Number, min:1900 }
      }
    },
    grade:       { type: String },
    description: { type: String },
    activities: { type: String },
    skills:     [{ type: Schema.Types.ObjectId, ref: 'Skill', validate: [(v: Schema.Types.ObjectId[]) => v.length <= 5, 'Max 5 skills'] }]
  }, { timestamps: true });
  
  export const Education: Model<IEducation> = mongoose.models.Education || mongoose.model('Education', EducationSchema);