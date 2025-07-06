import Container from "@/components/Container";
import FollowersLinkSection from "@/components/myNetwork/followers/FollowersLinkSection";
import { SearchFilterBar } from "@/components/search/SearchFilterBar"; 

export default function SearchResultsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-backgroundC-dark ">
      <SearchFilterBar />
      <Container>
        <div className="flex-1 h-fit  rounded-md p-4 ">
          {children}
        </div>
        <FollowersLinkSection />
      </Container>
    </div>
  );
}
