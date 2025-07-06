'use client';

import { SearchPeopleCard } from "@/components/search/SearchPeopleCard"; 
import { EmptyState } from "@/components/search/EmptyState"; 
import { useGlobalStore } from "@/store/globalStore";
import { useEffect } from "react";

export default function PeopleSearchPage({ searchParams }: { searchParams: Promise<{ keywords: string }> }) {
  const { searchPeopleResults, setSearchPeopleResults, setSearchPostResults } = useGlobalStore();
  
  useEffect(() => {
    const fetchResults = async () => {
      const params = await searchParams;
      const query = decodeURIComponent(params.keywords);
      
      if (query.trim()) {
        try {
          const encodedQuery = encodeURIComponent(query.trim());
          const response = await fetch(`/api/search?query=${encodedQuery}`);
          if (response.ok) {
            const { profiles, posts } = await response.json();
            setSearchPeopleResults(profiles);
            setSearchPostResults(posts); // Keep posts in sync for other pages
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    fetchResults();
  }, [searchParams, setSearchPeopleResults, setSearchPostResults]);

  return (
    <div className="space-y-6">
      <section className="bg-white dark:bg-backgroundC-dark p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">People</h3>
        {searchPeopleResults.length > 0
          ? searchPeopleResults.map((user) => (
              <SearchPeopleCard
                key={user._id}
                _id={user._id}
                firstName={user.firstName}
                lastName={user.lastName}
                headline={user.headline}
                profileImageUrl={user.profileImageUrl}
              />
            ))
          : <EmptyState text="No people found" />
        }
      </section>
    </div>
  );
}
