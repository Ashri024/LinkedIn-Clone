'use client';

import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // console.log('Resolved theme:', resolvedTheme);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button className=" flex-center flex-col gap-0 px-3 py-2 rounded-md transition-colors text-muted-foreground  font-roboto" onClick={toggleTheme}>

      {resolvedTheme === 'dark' ? (
        <FaSun className="w-5 h-5" />
      ) : (
        <FaMoon className="w-5 h-5" />
      )}
      <span className='text-sm'>
        {resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}
