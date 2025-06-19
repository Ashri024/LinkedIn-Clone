'use client';
import { signOut } from 'next-auth/react';
import React from 'react'

function LogoutButton() {
  return (
    <button onClick={()=> signOut()} className=' bg-red-500 text-white p-2 rounded'>
        Logout
    </button>
  )
}

export default LogoutButton