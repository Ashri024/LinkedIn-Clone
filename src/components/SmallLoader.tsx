import React from 'react'

function SmallLoader({loading, size, borderSize}: {loading: boolean, size?: string, borderSize?: string}) {
  return (
    <div className={`top-0 left-0 w-full h-full dark:bg-black/40 z-10 ${loading ? "absolute" : "hidden"} "}`}>
    <div className={`w-full h-full ${"flex-center"}`} >
        <div className={`loader border dark:border-white border-primaryC`}
        style={{
          width: size || "40px",
          height: size || "40px",
          // border: "1px solid #fff",
          borderWidth: borderSize || "6px",
        }}
        />
    </div>
</div>
  )
}

export default SmallLoader