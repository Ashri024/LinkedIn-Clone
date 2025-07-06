import { IProfile } from '@/models/Profile';
import { create } from 'zustand';

export interface SearchSuggestions  {
  _id: string; // Unique identifier for search suggestions
  text: string;
  link: string;
  icon?: string; // Optional icon for search suggestions
};

export interface SearchPeopleResult {
  _id: string;
  firstName: string;
  lastName: string;
  headline: string;
  profileImageUrl: string;
}

export interface SearchPostResult {
  _id: string;
  content: string;
  authorName: string;
  authorId: string;
}

interface GlobalStore {
  searchState: boolean;
  setSearchState: (state: boolean) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  searchResults: SearchSuggestions[];
  setSearchResults: (results: SearchSuggestions[]) => void;
  searchPeopleResults: SearchPeopleResult[];
  setSearchPeopleResults: (results: SearchPeopleResult[]) => void;
  searchPostResults: SearchPostResult[];
  setSearchPostResults: (results: SearchPostResult[]) => void;
  profile: IProfile|null;
  setProfile: (profile: IProfile) => void;
  fetchProfile: () => Promise<void>;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  searchState: false,
  setSearchState: (state) => set({ searchState: state }),
  searchText: '',
  setSearchText: (text) => set({ searchText: text }),
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
  searchPeopleResults: [],
  setSearchPeopleResults: (results) => set({ searchPeopleResults: results }),
  searchPostResults: [],
  setSearchPostResults: (results) => set({ searchPostResults: results }),
  profile: null,
  setProfile: (profile) => set({ profile }),
  fetchProfile: async () => {
    const res = await fetch('/api/profile');
    if (res.ok) {
      const data = await res.json();
      set({ profile: data });
    }
  },
}));