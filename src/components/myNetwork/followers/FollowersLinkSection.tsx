// components/myNetwork/followers/FollowersLinkSection.tsx

import React from 'react'

function FollowersLinkSection() {
  return (
    <div className="w-[280px] text-sm text-muted-foreground space-y-2 hidden md:block border-t-1 border-muted-foreground/40 dark:border-white/20">
      <ul className="flex w-full flex-wrap items-center justify-center gap-x-4  gap-y-2 text-xs pt-4 pb-2 px-8">
        <li className="hover:underline cursor-pointer">About</li>
        <li className="hover:underline cursor-pointer">Accessibility</li>
        <li className="hover:underline cursor-pointer">Help Center</li>
        <li className="hover:underline cursor-pointer">Privacy & Terms</li>
        <li className="hover:underline cursor-pointer">Ad Choices</li>
        <li className="hover:underline cursor-pointer">Advertising</li>
        <li className="hover:underline cursor-pointer">Business Services</li>
        <li className="hover:underline cursor-pointer">Get the LinkedIn app</li>
        <li className="hover:underline cursor-pointer">More</li>
      </ul>
      <p className=" text-black dark:text-white text-center">
        LinkedIn Corporation &copy; 2025
        </p>
    </div>
  )
}

export default FollowersLinkSection
