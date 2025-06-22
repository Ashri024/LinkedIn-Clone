import { ReactNode } from 'react';
import Navbar from '@/components/auth/common/Navbar';
import Footer from '@/components/auth/common/Footer';

export default function AuthLayout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen flex flex-col justify-between text-theme bg-backgroundC-light dark:bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
