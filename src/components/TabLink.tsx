'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

function TabLink({ href, text }: { href: string; text: string }) {
    const pathname = usePathname()
    const isActive = pathname === href
  
    return (
      <Link
        href={href}
        className={clsx(
          'pb-2 px-4 m-0',
          isActive ? 'border-b-2  border-successC text-successC' : 'text-muted-foreground hover:text-white'
        )}
      >
        {text}
      </Link>
    )
  }

export default TabLink;