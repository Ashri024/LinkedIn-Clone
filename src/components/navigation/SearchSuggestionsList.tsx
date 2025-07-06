'use client';

import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useGlobalStore } from "@/store/globalStore";

export default function SearchSuggestionsList() {
  const searchText = useGlobalStore((state) => state.searchText);
  const searchResults = useGlobalStore((state) => state.searchResults);
  const setSearchState = useGlobalStore((state) => state.setSearchState);
  const setSearchText = useGlobalStore((state) => state.setSearchText);

  if (!searchText || searchResults.length === 0) return null;

  return (
    <div className="absolute top-full left-0 mt-0 w-full md:min-w-[500px] bg-white dark:bg-backgroundC-dark border rounded-md shadow-lg z-50">
      <ul className="max-h-80 overflow-y-auto">
        {searchResults.map((item) => (
          <li key={item._id} className="last:border-b-0">
            <Link
              href={`/profile/${item._id}`}
              className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
              onClick={(e)=>{
                e.stopPropagation(); 
                setSearchState(false); 
                setSearchText(""); // Clear search text after selection
              }}
            >
              <FaSearch className="text-muted-foreground shrink-0" />
              <span className="text-sm text-theme line-clamp-1">{item.text}</span>
              {item.icon && (
                <Image
                  src={item.icon}
                  alt="suggestion icon"
                  width={24}
                  height={24}
                  className="ml-auto rounded-full object-cover"
                />
              )}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={`/search/results/all?keywords=${encodeURIComponent(searchText)}`}
            className="block text-center text-sm text-blue-600 py-2 hover:underline"
            onClick={(e) => {
              e.stopPropagation(); 
              setSearchState(false); // Close search suggestions
              setSearchText(""); // Clear search text after navigating
            }}
          >
            See all results
          </Link>
        </li>
      </ul>
    </div>
  );
}
