// components/providers/UserStatusProvider.tsx
'use client';

import { ReactNode } from 'react';
import { UserExistStatus, UserStatusContext } from '@/lib/context/UserStatusContext';

export function UserStatusProvider({
  userStatus,
  children,
}: {
  userStatus: UserExistStatus;
  children: ReactNode;
}) {
  return (
    <UserStatusContext.Provider value={{ userStatus }}>
      {children}
    </UserStatusContext.Provider>
  );
}
