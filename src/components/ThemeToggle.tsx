'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure rendering happens only on client
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      className="p-2"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? (
        <FaSun className="text-lg" />
      ) : (
        <FaMoon className="text-lg" />
      )}
    </Button>
  );
}
