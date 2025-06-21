"use client"

import { createContext, useContext } from 'react';

export type UserExistStatus = -1| 0 | 1 | 2;

interface UserStatusContextProps {
  userStatus: UserExistStatus | null;
}

export const UserStatusContext = createContext<UserStatusContextProps>({
  userStatus: null,
});

export const useUserStatus = () => useContext(UserStatusContext);
