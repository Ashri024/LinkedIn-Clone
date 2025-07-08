import { ReactNode } from 'react';

export default function MoreDetailsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md space-y-6 p-6 rounded-md shadow bg-white dark:bg-backgroundC-dark">
        {children}
      </div>
    </div>
  );
}
