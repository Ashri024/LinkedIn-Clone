'use client'
import Image from 'next/image'
import React from 'react'
import NotFoun from '@/../public/not-found.svg'
import Container from '@/components/Container'
import Link from 'next/link'

function NotFoundPage() {
  return (
    <Container>
    <div className='flex flex-col gap-2 items-center relative top-16'>
        <div className='flex justify-center items-center w-[250px]'>
            <Image 
                src={NotFoun}
                alt="not-found"
                width={400}
                height={400}
                className='w-full object-cover '
            />
      </div>
      <h1 className='text-2xl font-semibold text-center'>This page doesn&apos;t exist</h1>
      <p className='text-center text-theme-secondary'>Please check your URL or return to LinkedIn home.</p>
      <Link
      href={"/feed"} className='linkedIn-button-outline'>
        Go to Home
      </Link>
    </div>
    </Container>
  )
}

export default NotFoundPage