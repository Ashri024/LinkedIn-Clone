// src/components/feed/NewsPanel.tsx
'use client';

import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export const NewsPanel = () => {
  return (
    <Card className="bg-white dark:bg-backgroundC-dark p-4 rounded-xl shadow-sm text-theme space-y-3">
      <h3 className="font-semibold">LinkedIn News</h3>

      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="hover:underline cursor-pointer">
          <strong>Mumbai Airport lands $1B</strong> • 35,760 readers
        </li>
        <li className="hover:underline cursor-pointer">
          <strong>Iran, Israel agree to ceasefire</strong> • 2,395 readers
        </li>
        <li className="hover:underline cursor-pointer">
          <strong>Oil prices dip</strong> • 761 readers
        </li>
        <li className="hover:underline cursor-pointer">
          <strong>Big Four goes big on hiring</strong> • 13,357 readers
        </li>
        <li className="hover:underline cursor-pointer">
          <strong>More recruiters get AI savvy</strong> • 7,549 readers
        </li>
      </ul>

      <button className="flex items-center gap-1 text-primary text-sm hover:underline">
        Show more <ChevronDown size={14} />
      </button>

      <div className="mt-4 bg-muted p-2 rounded-md text-xs">
        <p>🧠 <strong>Today’s puzzle</strong></p>
        <p className="mt-1">Zip - a quick brain teaser</p>
        <p className="text-muted-foreground">14 connections played</p>
      </div>
    </Card>
  );
};
