"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { formatProfileURL } from "@/lib/formatProfileURL";

export const ProfileSidebar = () => {
  const {data: session} = useSession();
  if ( !session?.user || !session?.user?._id) return null; // Ensure session is available before rendering
  const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <div className="space-y-2 w-full">
      <div className="space-y-0">
        <Card className="border-0 dark:bg-backgroundC-dark gap-1 py-4 px-0 rounded-b-none">
          <CardHeader className="flex justify-between items-center">
            <h3 className="text-theme text-lg font-semibold">
              Profile language
            </h3>
            <Pencil className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            English
          </CardContent>
        </Card>

        <Card className="border-0 dark:bg-backgroundC-dark gap-1 py-4 px-0 rounded-t-none relative">
          {/* a divider of wideth 80% */}
          <div className="h-[1px] bg-muted-foreground/30 mx-auto absolute top-0 left-6 right-6" />
          <CardHeader className="flex justify-between items-center">
            <h3 className="text-theme text-lg font-semibold">
              Public profile & URL
            </h3>
            <Pencil className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-sm break-all">
            <Link href={
              BaseUrl ? `${BaseUrl}/profile/${formatProfileURL(session?.user?._id, session?.user?.firstName, session?.user?.lastName)}` : "#"
            } className="linkedIn-link">
            {BaseUrl ? BaseUrl + "/profile/"+formatProfileURL(session?.user?._id, session?.user?.firstName, session?.user?.lastName  ):"No Url" }
            </Link>
          </CardContent>
        </Card>
      </div>
      <Card className="border-0 dark:bg-backgroundC-dark gap-4 py-6 px-0">
        <CardHeader className="text-theme text-base font-semibold">
          Who your viewers also viewed
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {[
            "Someone at Manipal University Jaipur",
            "Journalist in the Education industry",
            "Another Manipal Student",
          ].map((name, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="min-w-10 h-10 bg-muted rounded-full" />
              <div className="flex flex-col gap-2">
                <div className="flex-1 text-theme">{name}</div>
                <button className="text-sm  linkedIn-button-white font-semibold">
                  View
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-0 dark:bg-backgroundC-dark gap-4 py-6 px-0">
        <CardHeader className="text-theme text-base font-semibold">
          People you may know
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {[
            {
              name: "Sooraj K V",
              title: "Full-Stack Developer | MERN Stack Developer...",
            },
            {
              name: "Abhishek Tiwari",
              title: "Student at APJ Abdul Kalam Technological University",
            },
            {
              name: "GAURAV KANSAL",
              title: "Owner at RD INDUSTRIES",
            },
            {
              name: "R.D INDUSTRIES",
              title: "Agriculture spears party at RD INDUSTRIES",
            },
          ].map((person, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-muted rounded-full shrink-0" />
              <div className="flex-1">
                <p className="text-theme text-sm font-medium">{person.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {person.title}
                </p>
                <button className="text-xs text-white/90 mt-2 px-4 py-1.5 border hover:bg-white/20 hover:text-white hover:border-white cursor-pointer border-white/80 rounded-3xl font-medium flex gap-1 items-center justify-center">
                  <HiMiniUserPlus size={18} className="" /> Connect
                </button>
              </div>
            </div>
          ))}
          <button className="text-sm text-blue-500 hover:underline mt-2 w-full text-center">
            Show all
          </button>
        </CardContent>
        <Button onClick={() => signOut({callbackUrl:"/auth/signup"})} variant={"destructive"} className="w-full">
            Logout
            </Button>
      </Card>
    </div>
  );
};
