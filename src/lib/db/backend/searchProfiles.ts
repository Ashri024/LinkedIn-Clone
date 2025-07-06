// src/lib/search/searchProfiles.ts
import {Profile} from "@/models/Profile";

export async function searchProfiles(query: string) {
  return Profile.find({
    $or: [
      { firstName: { $regex: query, $options: "i" } },
      { lastName: { $regex: query, $options: "i" } },
      { headline: { $regex: query, $options: "i" } }
    ]
  });
}
