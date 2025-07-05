"use client";

import Image from "next/image";
import { navigationItems } from "./navigation";
import { NavItem } from "./NavItem";
import Logo from "@/../public/linkedinIconShort.png";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";
import { useGlobalStore } from "@/store/globalStore";
import { useRef, useEffect } from "react";
import Link from "next/link";
import DefaultProfile from "@/../public/default-profile.svg";
export function DesktopNav() {
    const searchState = useGlobalStore((state) => state.searchState);
    const setSearchState = useGlobalStore((state) => state.setSearchState);
    const searchTabletRef = useRef<HTMLInputElement>(null);
    const profile = useGlobalStore((state) => state.profile);

    useEffect(() => {
        if (searchState && searchTabletRef.current) {
            searchTabletRef.current.focus();
        }
    }, [searchState]);

    const toggleNavItems = () => {
        // console.log("Toggle Nav Items Clicked: ", searchState);
        setSearchState(!searchState);
    //    Make the search input focused when toggled
        if (searchTabletRef.current && !searchState) {
            searchTabletRef.current.focus();
        }
    }
  return (
    <div className="px-4 bg-white dark:bg-backgroundC-dark sticky top-0 z-50">
        <nav className="hidden md:flex gap-6 items-center justify-between sticky top-0 z-50 h-14 border-b-1 w-full max-w-[1200px] mx-auto">
            <div className={`flex items-center gap-4 ${searchState && 'w-full'}`}>
                {/* Logo Section */}
                <Link href={"/feed"} className="flex items-center rounded-xs overflow-hidden">
                    <Image src={Logo} alt="Logo" className="h-9 w-auto" />
                </Link>

                {/* Search Bar */}
                <div className={`hidden lg:block min-w-64 relative `}>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <FaSearch size={16} />
                    </span>
                    <Input
                        type="text"
                        placeholder="Search"
                        className="pl-10 bg-backgroundC-light dark:bg-backgroundC-dark placeholder:text-slate-400 focus-visible:ring-0 border rounded-3xl border-slate-400 focus-visible:border-slate-200 transition-all duration-300 focus-visible:w-[350px] xl:focus-visible:w-[450px] w-full"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click from propagating to the nav items
                            setSearchState(true); // Set search state to true
                        }}
                    />
                </div>

                {/* Search Bar Tablet */}
                <div className={`w-full relative ${searchState ? 'block' : 'hidden'} lg:hidden`}>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <FaSearch size={16} />
                    </span>
                    <Input
                    id={"tablet-search"}
                    ref={searchTabletRef}
                        type="text"
                        placeholder="Search"
                        className="pl-10 bg-backgroundC-light dark:bg-backgroundC-dark placeholder:text-slate-400 focus-visible:ring-0 border rounded-3xl border-slate-400 focus-visible:border-slate-200 transition-all duration-300w-full"
                    />
                </div>
                {/* Search Icon */}
                <button className={`text-muted-foreground items-center justify-center flex-col gap-0 px-3 py-2 rounded-md transition-colors ${searchState?"hidden":" flex lg:hidden"}`} onClick={toggleNavItems}>
                    <FaSearch className="" size={20} />
                    <span className="text-sm hidden md:block">Search</span>
                </button>

            </div>
            <div className={` items-center gap-2 xl:gap-4 ${searchState ? 'hidden' : 'flex'} transition-all duration-300`}>
                {navigationItems.map((item) => (
                    <NavItem
                    key={item.href}
                    {...item}
                    icon={item.icon}
                    showLabel
                    />
                ))}
                {/* Vertical line of 10px */}
                <div className="w-[0.5px] bg-slate-600 h-14"></div>
                {/* Profile Avatar */}
                <ThemeToggle />
                <NavItem href={`/profile/${profile?.firstName.toLowerCase()}-${profile?.lastName.toLowerCase()}-${profile?._id}`}
                label="Profile"
                icon={
                    <Image
                    className="rounded-full"
                    width={25}
                    height={25}
                    src={profile?.profileImageUrl || DefaultProfile}
                    alt="Profile Avatar"
                     />
                }

                 />
        </div>
        </nav>
    </div>
  );
}
