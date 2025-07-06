// src/lib/search/searchPosts.ts
import {Post} from "@/models/Post";

export async function searchPosts(query: string) {
  return Post.find({
    $or: [
      { content: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } }
    ]
  }).populate("author", "firstName lastName profileImageUrl");
}
