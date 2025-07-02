"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";
interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactElement<IconType>;
  showLabel?: boolean;
}

export function NavItem({ href, label, icon, showLabel = true }: NavItemProps) {
  const pathname = usePathname();
  const isActive =
    href === '/'
      ? pathname === '/'
      : pathname.startsWith(href + '/') || pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex-center flex-col gap-0 px-0 sm:px-3 py-2 transition-colors h-14",
        isActive ? "text-primaryC dark:text-white font-semibold border-b-2 border-b-primaryC dark:border-b-white" : "text-muted-foreground"
      )}
    >
      <span className="text-xl">
        {icon}
      </span>
      {showLabel && <span className="text-xs text-center tracking-tight sm:tracking-normal sm:text-sm">{label}</span>}
    </Link>
  );
}
