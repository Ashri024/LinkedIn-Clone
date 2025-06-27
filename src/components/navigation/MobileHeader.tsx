"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FaEnvelope, FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { useGlobalStore } from "@/store/globalStore";
import { useRef, useEffect } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Button } from "../ui/button";
import Link from "next/link";


export function MobileHeader() {
  const {data: session} = useSession();
  const searchState = useGlobalStore((state) => state.searchState);
  const setSearchState = useGlobalStore((state) => state.setSearchState);
  const searchTabletRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      if (searchState && searchTabletRef.current) {
          searchTabletRef.current.focus();
      }
  }, [searchState]);

  return (
    <header className="flex items-center justify-between md:hidden p-3 bg-backgroundC-light dark:bg-backgroundC-dark sticky top-0 z-50 border-b">
      <div className="flex-center gap-2 w-full">
        <Link href={"/profile"} className="flex items-center gap-2">
        <Image
              src={session?.user.image || "https://res.cloudinary.com/djnhadxeb/image/upload/v1750766650/vecteezy_man-empty-avatar-vector-photo-placeholder-for-social_36594092_syrkdk.jpg"}
              alt={"User name"}
              width={35}
              height={35}
              className="rounded-full"
            />
          </Link>
          <div className={`w-full relative md:hidden`}>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <FaSearch size={16} />
                    </span>
                    <Input
                    id={"tablet-search"}
                    ref={searchTabletRef}
                        type="text"
                        placeholder="Search"
                        className="pl-10 bg-backgroundC-light dark:bg-[#38434F] placeholder:text-slate-400 focus-visible:ring-0 border-0 rounded  focus-visible:border-slate-200 transition-all duration-300w-full"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click from propagating to the nav items
                            setSearchState(true); // Set search state to true
                        }}
                    />
                </div>
      </div>
      <div className="flex items-center gap-3 pl-4">
        <FaEnvelope className="text-xl text-theme" />
        <Button variant={"destructive"} onClick={() => signOut({callbackUrl: "/auth/signup"})}> <RiLogoutBoxRLine className="text-xl" /></Button>
      </div>
    </header>
  );
}
