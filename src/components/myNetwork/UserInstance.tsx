import Image from "next/image";
import Link from "next/link";
import DefaultProfile from "@/../public/default-profile.svg";
// import { FaCheck, FaPlus } from "react-icons/fa";
import FollowToggleButton from "./FollowToggleButton";
export type FollowSchema = {
  _id: string;
  firstName: string;
  lastName: string;
  headline: string;
  profileImageUrl: string;
};
function UserInstance({ follower, isFollowing }: { follower: FollowSchema, isFollowing?: boolean }) {
    const profileSlug = `/profile/${follower.firstName.toLowerCase()}-${follower.lastName.toLowerCase()}-${follower._id}`;
    return (
   <div key={follower._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <Link href={profileSlug}>
                    <Image
                      src={DefaultProfile}
                      alt={`${follower.firstName}'s avatar`}
                      width={48}
                      height={48}
                      className="rounded-full w-[48px] h-[48px] object-cover"
                    />
                  </Link>
                  <div>
                    <Link href={profileSlug}>
                      <p className="font-medium hover:underline">{follower.firstName} {follower.lastName}</p>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {follower.headline}
                    </p>
                  </div>
                </div>
                <FollowToggleButton isFollowing={isFollowing || false} userViewedId={follower._id.toString()} className="text-sm" />
              </div>
    );
  }

export default UserInstance;