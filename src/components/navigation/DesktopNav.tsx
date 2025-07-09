"use client";

import Image from "next/image";
import { navigationItems } from "./navigation";
import { NavItem } from "./NavItem";
import Logo from "@/../public/linkedinIconShort.png";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import ThemeToggle from "../ThemeToggle";
import { SearchPeopleResult, useGlobalStore } from "@/store/globalStore";
import { useRef, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import DefaultProfile from "@/../public/default-profile.svg";
import { SearchSuggestions } from "@/store/globalStore";
import SearchSuggestionsList from "./SearchSuggestionsList";
import { useRouter } from "next/navigation";

// 4 sample search suggestions
export const searchSuggestions: SearchSuggestions[] = [
    {
        _id: "1",
        text: "Software Engineer Jobs",
        link: "/search/jobs?query=Software+Engineer",
    },
    {
        _id: "2",
        text: "Data Science Courses",
        link: "/search/courses?query=Data+Science",
        icon: "https://example.com/icons/course-icon.png"
    },
    {
        _id: "3",
        text: "Marketing Strategies",
        link: "/search/articles?query=Marketing+Strategies",
    },
    {
        _id: "4",
        text: "Networking Events",
        link: "/search/events?query=Networking+Events",
        icon: "https://example.com/icons/event-icon.png"
    }
];

export function DesktopNav() {
    const searchState = useGlobalStore((state) => state.searchState);
    const setSearchState = useGlobalStore((state) => state.setSearchState);
    const setSearchText = useGlobalStore((state) => state.setSearchText);
    const setSearchPeopleResults = useGlobalStore((state) => state.setSearchPeopleResults);
    const setSearchPostResults = useGlobalStore((state) => state.setSearchPostResults);
    const setSearchResults = useGlobalStore((state) => state.setSearchResults);
    const searchText = useGlobalStore((state) => state.searchText);
    const searchTabletRef = useRef<HTMLInputElement>(null);
    const profile = useGlobalStore((state) => state.globalProfile);
    const router = useRouter();
    useEffect(() => {
        if (searchState && searchTabletRef.current) {
            searchTabletRef.current.focus();
        }
    }, [searchState]);

    const toggleNavItems = () => {
        setSearchState(!searchState);
        if (searchTabletRef.current && !searchState) {
            searchTabletRef.current.focus();
        }
    }
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
            // console.log('Search submitted:', searchText);
            
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
                        className="pl-10 bg-white dark:bg-backgroundC-dark placeholder:text-slate-400 focus-visible:ring-0 border rounded-3xl border-slate-400 focus-visible:border-slate-200 transition-all duration-300 focus-visible:w-[350px] xl:focus-visible:w-[450px] w-full"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            setSearchState(true); 
                        }}
                        onChange={handleSearchOnChange} 
                        value={searchText} 
                        id="desktop-search"
                        onKeyDown={handleSearchEnter} 
                        autoComplete="off"
                    />
                    <SearchSuggestionsList />
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
                        onChange={handleSearchOnChange} 
                        value={searchText} 
                        onKeyDown={handleSearchEnter} 
                        autoComplete="off"
                    />
                    <SearchSuggestionsList />
                </div>
                {/* Search Icon */}
                <button className={`text-muted-foreground items-center justify-center flex-col gap-0 px-3 py-2 rounded-md transition-colors ${searchState?"hidden":" flex lg:hidden"}`} onClick={toggleNavItems}>
                    <FaSearch className="" size={20} />
                    <span className="text-sm hidden md:block">Search</span>
                </button>

            </div>
            <div className={` items-center gap-2 xl:gap-4 ${searchState ? 'hidden lg:flex' : 'flex'} transition-all duration-300 min-w-fit`}>
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
