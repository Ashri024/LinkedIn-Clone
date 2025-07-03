import React from 'react'

function Container({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen background-theme text-theme">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row px-2 gap-5 md:px-2 lg:px-10 pt-4 pb-16 justify-center">
            {children}
        </div>
    </div>
  )
}

export default Container