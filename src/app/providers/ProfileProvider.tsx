// src/components/providers/ProfileProvider.tsx
'use client';
import { useEffect } from 'react';
import { useGlobalStore } from '@/store/globalStore';

export default function ProfileProvider({ children }: { children: React.ReactNode }) {
  const fetchProfile = useGlobalStore((state) => state.fetchProfile);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return <>{children}</>;
}