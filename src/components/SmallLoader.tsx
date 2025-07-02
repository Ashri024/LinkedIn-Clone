import React from 'react'

function SmallLoader({loading}: {loading: boolean}) {
  return (
    <div className={`top-0 left-0 w-full h-full bg-black/40 z-10 ${loading ? "absolute" : "hidden"}`}>
    <div className={`w-full h-full ${"flex-center"}`} >
        <div className='loader'/>
    </div>
</div>
  )
}

export default SmallLoader