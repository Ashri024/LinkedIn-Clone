"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FaEnvelope, FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { SearchPeopleResult, SearchSuggestions, useGlobalStore } from "@/store/globalStore";
import { useRef, useEffect, ChangeEvent } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Button } from "../ui/button";
import Link from "next/link";
import SearchSuggestionsList from "./SearchSuggestionsList";
import DefaultProfile from "@/../public/default-profile.svg";
import { useRouter } from "next/navigation";

export function MobileHeader() {
  const {data: session} = useSession();
  const searchState = useGlobalStore((state) => state.searchState);
  const setSearchState = useGlobalStore((state) => state.setSearchState);
  const setSearchText = useGlobalStore((state) => state.setSearchText);
  const setSearchPeopleResults = useGlobalStore((state) => state.setSearchPeopleResults);
  const setSearchResults = useGlobalStore((state) => state.setSearchResults);

  const setSearchPostResults = useGlobalStore((state) => state.setSearchPostResults);
  const searchText = useGlobalStore((state) => state.searchText);
  const profile = useGlobalStore((state) => state.profile);
  const router = useRouter();
  const searchTabletRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      if (searchState && searchTabletRef.current) {
          searchTabletRef.current.focus();
      }
  }, [searchState]);
  const handleSearchOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); 
    const value = e.currentTarget.value;
    setSearchText(value); 
    
    // Fetch search results if query is not empty
    if (value.trim().length > 0) {
        try {
            const encodedQuery = encodeURIComponent(value.trim());
            const response = await fetch(`/api/search?query=${encodedQuery}`);
            if (response.ok) {
                const { profiles, posts } = await response.json();
                setSearchPeopleResults(profiles);
                setSearchPostResults(posts);
                const searchResults: SearchSuggestions[] = profiles.map((profile:SearchPeopleResult) => ({
                    _id: profile._id,
                    text: `${profile.firstName} ${profile.lastName}`,
                    link: `/profile/${profile.firstName.toLowerCase()}-${profile.lastName.toLowerCase()}-${profile._id}`,
                    icon: profile.profileImageUrl || DefaultProfile
                }));
                setSearchResults(searchResults); // Update search results in global store
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    } else {
        // Clear results if search is empty
        setSearchPeopleResults([]);
        setSearchPostResults([]);
    }
};

const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation(); 
    if (e.key === 'Enter') {
        console.log('Search submitted:', searchText);
        
        const encodedSearchText = encodeURIComponent(searchText.trim());
        if (searchText.trim() !== "") {
            router.push(`/search/results/all?keywords=${encodedSearchText}`);
            setSearchState(false); 
        }

    }
    if (e.key === 'Escape') {
        setSearchState(false); 
        setSearchText("");
    }
}
  return (
    <header className="flex items-center justify-between md:hidden p-3 bg-backgroundC-light dark:bg-backgroundC-dark sticky top-0 z-50 border-b">
      <div className="flex-center gap-2 w-full">
        <Link href={`/profile/${profile?.firstName.toLowerCase()}-${profile?.lastName.toLowerCase()}-${profile?._id}`}
         className="flex items-center gap-2">
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
                          e.stopPropagation();
                          setSearchState(true);
                      }}
                      onChange={handleSearchOnChange}
                      value={searchText}
                      onKeyDown={handleSearchEnter}
                      autoComplete="off"
                    />
                    <SearchSuggestionsList />
                </div>
      </div>
      <div className="flex items-center gap-3 pl-4">
        <FaEnvelope className="text-xl text-theme" />
        <Button variant={"destructive"} onClick={() => signOut({callbackUrl: "/auth/signup"})}> <RiLogoutBoxRLine className="text-xl" /></Button>
      </div>
    </header>
  );
}
