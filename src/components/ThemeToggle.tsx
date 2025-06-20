'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('Resolved theme:', resolvedTheme);
  }, [resolvedTheme]);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="ghost" className="p-2" onClick={toggleTheme}>
      {resolvedTheme === 'dark' ? (
        <FaSun className="text-lg" />
      ) : (
        <FaMoon className="text-lg" />
      )}
    </Button>
  );
}
