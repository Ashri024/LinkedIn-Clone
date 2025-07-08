import { formatProfileURL } from "@/lib/formatProfileURL";
import Image from "next/image";
import Link from "next/link";
import DefaultImage from "@/../public/default-profile.svg";

export interface SearchPeopleCardProps {
  firstName: string;
  lastName?: string;
    headline?: string;
    profileImageUrl?: string;
    _id: string;
  }
  
  export function SearchPeopleCard({ firstName, lastName, headline, _id,  profileImageUrl }: SearchPeopleCardProps) {
    const name = `${firstName} ${lastName || ""}`.trim();
    return (
      <Link href={`/profile/${formatProfileURL(  
        _id,firstName, lastName, 
      )}`} className="flex gap-4 items-center p-4 hover:bg-muted rounded-md border-b group">
        <Image
          src={profileImageUrl || DefaultImage }
          className="w-12 h-12 rounded-full object-cover"
          alt="profile"
          width={12}
          height={12}
        />
        <div>
          <h4 className="font-semibold group-hover:underline">{name}</h4>
          <p className="text-sm text-muted-foreground">{headline}</p>
        </div>
      </Link>
    );
  }
  