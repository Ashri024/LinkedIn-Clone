import { create } from 'zustand';
// Create an interface and store for searchState and setSearchState

interface GlobalStore {
  searchState: boolean;
  setSearchState: (state: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  searchState: false, // Default state for search input visibility
  setSearchState: (state) => set({ searchState: state }),
}));