import { IProfile } from '@/models/Profile';
import { create } from 'zustand';
// Create an interface and store for searchState and setSearchState

interface GlobalStore {
  searchState: boolean;
  setSearchState: (state: boolean) => void;
  profile: IProfile|null;
  setProfile: (profile: IProfile) => void;
  fetchProfile: () => Promise<void>;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  searchState: false, // Default state for search input visibility
  setSearchState: (state) => set({ searchState: state }),
  profile: null, // Default profile state,
  setProfile: (profile) => set({ profile }),
  fetchProfile: async () => {
    const res = await fetch('/api/profile');
    if (res.ok) {
      const data = await res.json();
      set({ profile: data });
      // console.log("Profile fetched successfully: ", data);
    }
  },
}));