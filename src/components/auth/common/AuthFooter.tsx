import Link from 'next/link'
import React from 'react'

function AuthFooter() {
  return (
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
  )
}

export default AuthFooter