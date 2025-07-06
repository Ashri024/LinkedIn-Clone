// src/lib/search/searchAll.ts
import { searchPosts } from "./searchPosts";

import { SearchPeopleCardProps } from "@/components/search/SearchPeopleCard";
import { SearchPostCardProps } from "@/components/search/SearchPostCard";

import { searchProfiles } from "./searchProfiles";
export const samplePeopleResults: SearchPeopleCardProps[] = [
  {
    _id: "64f92e4a3b2a4f87ab23cd01",
    firstName: "Anamika",
    lastName: "Tripathi",
    headline: "Summer Intern at BHEL | Electronics Engineering Enthusiast",
    profileImageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    _id: "64f92e4a3b2a4f87ab23cd02",
    firstName: "Anas",
    lastName: "Pathan",
    headline: "Student at Manipal University Jaipur | AI Enthusiast",
    profileImageUrl: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    _id: "64f92e4a3b2a4f87ab23cd03",
    firstName: "Ananya",
    lastName: "Wadhwa",
    headline: "SWE Intern @ EPAM | Data Science | Open Source",
    profileImageUrl: "https://randomuser.me/api/portraits/women/70.jpg",
  },
  {
    _id: "64f92e4a3b2a4f87ab23cd04",
    firstName: "Anand",
    lastName: "Gupta",
    headline: "ML Development | PwC LaunchPad'24 | Python & C++",
    profileImageUrl: "https://randomuser.me/api/portraits/men/61.jpg",
  },
];

export const samplePostResults: SearchPostCardProps[] = [
  {
    _id: "post01",
    content: "We're #hiring! Know someone who might be interested? Job at Ziniosa for Graphic Designer (Remote).",
    authorName: "Ashri Jaiswal",
    authorId: "64f92e4a3b2a4f87ab23cd10",
  },
  {
    _id: "post02",
    content: "Just wrapped up my internship at PwC 🚀. Excited for what's next!",
    authorName: "Anand Gupta",
    authorId: "64f92e4a3b2a4f87ab23cd04",
  },
  {
    _id: "post03",
    content: "Attended a brilliant seminar on Edge AI at EPAM Systems. Amazing insights into ML on the edge!",
    authorName: "Ananya Wadhwa",
    authorId: "64f92e4a3b2a4f87ab23cd03",
  },
  {
    _id: "post04",
    content: "Excited to share my recent project on Autonomous Drones. Built using ROS2, Python, and YOLOv8.",
    authorName: "Anas Pathan",
    authorId: "64f92e4a3b2a4f87ab23cd02",
  },
];


export async function searchAll(query: string) {
  const [profiles, posts] = await Promise.all([
    searchProfiles(query),
    searchPosts(query),
  ]);
  
  return { profiles, posts};
}
