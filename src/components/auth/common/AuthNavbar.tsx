"use client"
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '@/../public/linkedinIcon.svg'; // Assuming you have a Logo component


function AuthNavbar() {
  return (
    <nav className="py-4 px-6 flex-between">
        <Link href="/auth/signup" className="flex items-center space-x-1">
          <Image src={Logo} alt="LinkedIn" width={120}  priority />
        </Link>
        <div className='flex items-center gap-4'>
          <Button variant="destructive" onClick={()=>{
            signOut({ callbackUrl: '/auth/signup' })
          }} >Logout</Button>
          <ThemeToggle />
        </div>
      </nav>
  )
}

export default AuthNavbar