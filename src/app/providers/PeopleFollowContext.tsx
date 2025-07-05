"use client";
import { FollowSchema } from "@/components/myNetwork/UserInstance";
import React, { createContext, useContext } from "react";

export type PeopleFollowData = {
  followers: FollowSchema[];
  following: FollowSchema[];
  followingIds?: string[];
  followersIds?: string[];
};

const PeopleFollowContext = createContext<PeopleFollowData | undefined>(undefined);

export const PeopleFollowProvider = ({
  value,
  children,
}: {
  value: PeopleFollowData;
  children: React.ReactNode;
}) => (
  <PeopleFollowContext.Provider value={value}>
    {children}
  </PeopleFollowContext.Provider>
);

export const usePeopleFollow = () => {
  const context = useContext(PeopleFollowContext);
  if (!context) throw new Error("usePeopleFollow must be used within PeopleFollowProvider");
  return context;
};