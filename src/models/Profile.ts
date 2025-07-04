import mongoose, { Schema, Document, Model } from 'mongoose';
// import { IExperience } from './Experience';
// import { IEducation } from './Education';

export interface IProfile extends Document {
  authProvider: 'google' | 'credentials';
  email: string;
  emailVerified: boolean;
  phone: string;
  password?: string;
  authStep: -1| 0 | 1 | 2 | 3 | 4 | 5; // -1 for no session, 0 for no user, 1 for basic info, 2 for more details, etc.
  isStudent?: boolean; 
  over16: boolean; 
  workingAt?: string; // Optional field to track current employment, if applicable

  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  bannerImageUrl?: string;
  headline?: string;
  about?: string;
  lookingForJob?: ["yes", "no", "maybe"]; // Optional, can be used to track job seeking status

  pronouns?: 'he/him' | 'she/her' | 'they/them' | 'other';
  location?: {
    countryRegion: string;
    city?: string;
  };

  address?: string;
  birthday?: { month: string; day: number };

  // connections: mongoose.Types.ObjectId[];
  // followers: mongoose.Types.ObjectId[];
  // posts: mongoose.Types.ObjectId[];
  // experiences: mongoose.Types.ObjectId[];
  // educations: mongoose.Types.ObjectId[];
  // skills: mongoose.Types.ObjectId[];
}
// export interface IProfilePopulated extends Document {
//   authProvider: 'google' | 'credentials';
//   email: string;
//   emailVerified: boolean;
//   phone: string;
//   password?: string;
//   authStep: -1| 0 | 1 | 2 | 3 | 4 | 5; // -1 for no session, 0 for no user, 1 for basic info, 2 for more details, etc.
//   isStudent?: boolean; 
//   over16: boolean; 

//   firstName: string;
//   lastName: string;
//   profileImageUrl?: string;
//   bannerImageUrl?: string;
//   headline?: string;
//   about?: string;
//   lookingForJob?: ["yes", "no", "maybe"]; // Optional, can be used to track job seeking status

//   pronouns?: 'he/him' | 'she/her' | 'they/them' | 'other';
//   location?: {
//     countryRegion: string;
//     city?: string;
//   };

//   address?: string;
//   birthday?: { month: string; day: number };

//   // connections: mongoose.Types.ObjectId[];
//   // followers: mongoose.Types.ObjectId[];
//   // posts: mongoose.Types.ObjectId[];
//   // experiences: IExperience[];
//   // educations: IEducation[];
//   // skills: mongoose.Types.ObjectId[];
// }

const ProfileSchema = new Schema<IProfile>({
  authProvider: { type: String, enum: ['google', 'credentials'], required: true },
  email:        { type: String, required: true, unique: true },
  emailVerified: { type: Boolean, default: false },
  phone:  { type: String, required: true, unique: true },
  password: { type: String },
  authStep:     { type: Number, default: 1 }, // Default to step 1 for onboarding
  isStudent:    { type: Boolean, default: false },
  lookingForJob: { type: [String], enum: ['yes', 'no', 'maybe'], default: ['yes'] },
  over16:       { type: Boolean, default: true },
  workingAt:    { type: String }, // Optional field to track current employment, if applicable

  firstName:    { type: String, required: true },
  lastName:     { type: String, required: true },
  profileImageUrl: { type: String },
  bannerImageUrl:  { type: String },
  headline:     { type: String },
  about:        { type: String },

  pronouns:     { type: String, enum: ['he/him', 'she/her', 'they/them', 'other'] },
  location: {
    countryRegion: { type: String },
    city:          { type: String },
  },

  address:       { type: String },
  birthday: {
    month:       { type: String },
    day:         { type: Number }
  },

  // connections:   [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  // followers:     [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  // posts:         [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  // experiences:   [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
  // educations:    [{ type: Schema.Types.ObjectId, ref: 'Education' }],
  // skills:        [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
}, { timestamps: true });

export const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);