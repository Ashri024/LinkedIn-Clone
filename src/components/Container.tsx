import React from 'react'

function Container({children}: {children: React.ReactNode}) {
  return (
    <div className="px-4 bg-white dark:bg-backgroundC-dark ">
        <div className='w-full max-w-[1200px] mx-auto'>
            {children}
        </div>
    </div>
  )
}

export default Container