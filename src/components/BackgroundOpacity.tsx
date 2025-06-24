"use client";
import { useGlobalStore } from '@/store/globalStore';

function BackgroundOpacity() {
    const searchState = useGlobalStore((state) => state.searchState);
    const setSearchState = useGlobalStore((state) => state.setSearchState);
  return (
    <div className={`fixed inset-0 bg-black opacity-50 z-10 ${searchState ? 'block' : 'hidden'}`}
            onClick={() => setSearchState(false)} 
            style={{ backdropFilter: 'blur(5px)' }} // Optional: adds a blur effect
            data-testid="background-opacity" // For testing purposes
    >
    </div>
  )
}

export default BackgroundOpacity