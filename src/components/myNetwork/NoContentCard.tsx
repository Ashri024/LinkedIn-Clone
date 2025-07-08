import Image from 'next/image'
import React from 'react'
import DefaultNoContent from '@/../public/default-no-content.svg'

function NoContentCard({text}: {text?: string}) {
  return (
    <div className="flex flex-col gap-4 p-4">
    <Image src={DefaultNoContent} alt={text || "No content"} width={150} height={150} className="mx-auto" />
    <p className="text-center ">{
        text || "You have no content to display."
        }</p>
  </div>
  )
}

export default NoContentCard