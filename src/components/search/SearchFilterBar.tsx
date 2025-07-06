"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const filters = ["all", "people", "posts"];

export function SearchFilterBar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywords = searchParams.get("keywords") || "";

  const currentFilter = pathname.split("/").at(-1); // e.g. /search/results/people

  const goToFilter = (filter: string) => {
    router.push(`/search/results/${filter}?keywords=${keywords}`);
  };

  return (
    <div className="flex gap-3 overflow-x-auto border-b w-full max-w-[1200px] mx-auto py-3 px-2 md:px-2 lg:px-10 ">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => goToFilter(filter)}
          className={cn(
            "font-bold px-4 py-1 rounded-full cursor-pointer transition-colors duration-200",
            currentFilter === filter
              ? "bg-successC text-black"
              : " linkedIn-button-outline2"
          )}
        >
          {filter[0].toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}
