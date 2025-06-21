import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/../public/linkedinIcon.svg'; // Assuming you have a Logo component
import ThemeToggle from '@/components/ThemeToggle';


export default function AuthLayout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen flex flex-col justify-between text-theme bg-backgroundC-light dark:bg-black">
      {/* Navbar */}
      <nav className="py-4 px-6 flex-between">
        <Link href="/" className="flex items-center space-x-1">
          <Image src={Logo} alt="LinkedIn" width={120}  priority />
        </Link>
        <ThemeToggle />
      </nav>

      {/* Page content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="text-sm text-gray-500 dark:text-gray-400 p-4 text-center border-t border-gray-200 dark:border-gray-700">
        <p>
          LinkedIn © 2025 ·{' '}
          <Link href="#" className="text-purple-600 hover:underline">
            About
          </Link>{' '}
          ·{' '}
          <Link href="#" className="text-purple-600 hover:underline">
            Privacy
          </Link>
        </p>
      </footer>
    </div>
  );
}
