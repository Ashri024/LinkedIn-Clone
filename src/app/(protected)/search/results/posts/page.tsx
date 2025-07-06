'use client';

import { SearchPostCard } from "@/components/search/SearchPostCard";
import { EmptyState } from "@/components/search/EmptyState";
import { useGlobalStore } from "@/store/globalStore";
import { useEffect } from "react";

export default function PostsSearchPage({ searchParams }: { searchParams: Promise<{ keywords: string }> }) {
  const { searchPostResults, setSearchPeopleResults, setSearchPostResults } = useGlobalStore();
  
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
            setSearchPeopleResults(profiles); // Keep people in sync for other pages
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
      <section className="dark:bg-backgroundC-dark p-4 rounded-lg">
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
