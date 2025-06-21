import React from 'react'
import { SiLinkedin } from "react-icons/si";

function LoaderComponent({text}: {text?: string}) {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-backgroundC-light dark:bg-backgroundC-dark flex-col flex-center z-50"> 
    <div className='w-[200px]'>
        <SiLinkedin className="text-primaryC mx-auto" size={80} />    
        <div className="line">
        <div className="inner"></div>
        </div>
    </div>
    <span className='text-theme mt-5'>
    {text || ""}
    </span>
  </div>
  )
}

export default LoaderComponent