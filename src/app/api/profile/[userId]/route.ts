import '@/models/registerAllModels'; // <-- This line first!
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

let apiCall = 0;

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  console.log('apiCall /profile/userId: ', ++apiCall);
  const { userId } = await params;

  try {
    await connectDB();

    let profile = await Profile.findById(userId);

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const hasEducation = profile.educations && profile.educations.length > 0;
    const hasExperience = profile.experiences && profile.experiences.length > 0;
    // console.log("→ Profile found:", profile, "hasEducation:", hasEducation, "hasExperience:", hasExperience);
    if (hasEducation || hasExperience) {
      const populateFields = [];
      if (hasEducation) {
        // console.log("→ Populating educations");
        populateFields.push('educations');
      }
      if (hasExperience) {
        // console.log("→ Populating experiences");
        populateFields.push('experiences');
      }
      // console.log("→ Populating fields:", populateFields.join(", "));
      profile = await profile.populate(populateFields);
    }

    // console.log("✅ Final populated profile:", profile);
    return NextResponse.json(profile);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch profile";
    console.error("❌ Error in GET /profile/[userId]:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
