// src/components/feed/Sidebar.tsx
'use client';

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { Session } from "next-auth";
import DefaultImage from '@/../public/default-profile.svg'; // Adjust the path as necessary
import { useGlobalStore } from "@/store/globalStore";

type Props = {
  user?: Session["user"];
};

export const FeedSidebar = ({ user }: Props) => {
  const globalProfile = useGlobalStore((state) => state.globalProfile);
  const name = user?.firstName + (user?.lastName ? " " + user?.lastName : "");
  const location = globalProfile?.location?.city + (globalProfile?.location?.countryRegion ? ", " + globalProfile?.location?.countryRegion : "");
  return (
    <Card className="bg-white dark:bg-backgroundC-dark p-4 rounded-md shadow-none text-theme flex flex-col gap-4 border-none">
      {/* Profile Card */}
      <div className="text-center">
        <Image
          src={user?.image || DefaultImage}
          alt="profile"
          width={80}
          height={80}
          className="mx-auto rounded-full"
        />
        <h3 className="font-semibold text-lg mt-2 flex items-center justify-center gap-1">
          {name || "User Name"}
          <BadgeCheck className="w-5 h-5 text-primaryC" />
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
         {globalProfile?.headline || "No Headline"}
        </p>
        <p className="text-xs mt-1 text-muted-foreground">
          {location || "No Location"}
        </p>
        <p className="text-xs font-medium text-primary mt-1">
          🎓 {globalProfile?.workingAt}
        </p>
      </div>

      {/* Stats */}
      <div className="text-sm bg-muted rounded-md p-3 space-y-2">
        <div className="flex-between">
          <span className="text-muted-foreground">Profile viewers</span>
          <span className="font-semibold text-primary">20</span>
        </div>
        <div className="flex-between">
          <span className="text-muted-foreground">Post impressions</span>
          <span className="font-semibold text-primary">21</span>
        </div>
      </div>

      {/* Premium */}
      <div className="text-sm bg-muted rounded-md p-3 space-y-1">
        <span className="text-muted-foreground">Grow your career</span>
        <p className="text-primary text-sm font-medium">
          🌟 Try 1 month for ₹0
        </p>
      </div>

      {/* Quick Links */}
      <div className="text-sm space-y-2">
        <p className="cursor-pointer hover:underline">🔖 Saved items</p>
        <p className="cursor-pointer hover:underline">👥 Groups</p>
        <p className="cursor-pointer hover:underline">📰 Newsletters</p>
        <p className="cursor-pointer hover:underline">📅 Events</p>
      </div>
    </Card>
  );
};
