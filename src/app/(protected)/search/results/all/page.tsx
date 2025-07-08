'use client';

import { SearchPeopleCard } from "@/components/search/SearchPeopleCard"; 
import { SearchPostCard } from "@/components/search/SearchPostCard"; 
import { EmptyState } from "@/components/search/EmptyState"; 
import { useGlobalStore } from "@/store/globalStore";
import { useEffect } from "react";

export default function AllSearchPage({ searchParams }: { searchParams: Promise<{ keywords: string }> }) {
  const { searchPeopleResults, searchPostResults, setSearchPeopleResults, setSearchPostResults } = useGlobalStore();
  
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
            setSearchPostResults(posts);
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
      <section className="bg-white dark:bg-backgroundC-dark p-4 rounded-md">
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

      <section className="dark:bg-backgroundC-dark p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Posts</h3>
        {searchPostResults.length > 0
          ? searchPostResults.map((post) => (
              <SearchPostCard
                key={post._id}
                _id={post._id}
                content={post.content}
                authorName={post.authorName}
                authorId={post.authorId}
              />
            ))
          : <EmptyState text="No posts found" />
        }
      </section>
    </div>
  );
}
