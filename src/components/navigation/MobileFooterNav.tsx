"use client";

import { navigationItems } from "./navigation";
import { NavItem } from "./NavItem";

export function MobileFooterNav() {
  return (
    <nav className="md:hidden fixed bottom-0 w-full bg-backgroundC-light dark:bg-backgroundC-dark border-t z-50 flex justify-around py-2">
      {navigationItems.map((item) => (
        <NavItem key={item.href} {...item} 
        icon={item.icon }
        showLabel />
      ))}
    </nav>
  );
}
