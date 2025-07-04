import { Pencil } from 'lucide-react'
import React from 'react'
import { FaUserFriends } from 'react-icons/fa'

function ProfileOptions({isOwner}: {isOwner: boolean}) {
  return (
    <>
    {isOwner ?
        <>
          <div className="sm:mt-0 flex gap-2">
              <button className=" text-sm linkedIn-button-filled">Open to</button>
              <button className="text-sm linkedIn-button-outline">Add profile section</button>
              <button className=" text-sm linkedIn-button-outline ">Enhance profile</button>
              <button className="px-3 py-1 text-sm rounded-full linkedIn-button-white">Resources</button>
          </div>
          <div className='w-1/2 p-3 bg-[#DDE7F1] dark:bg-[#38434F] rounded-md relative'>
              <h3 className=' text-sm font-semibold'>Open to work</h3>
              <p className='text-sm line-clamp-1 mt-1'>Full Stack developer, User experience design... and idk what more</p>
              <p className='text-sm linkedIn-link'>Show details</p>
              <button className="absolute top-1 right-1    rounded-full p-2">
              <Pencil size={14} />
              </button>
          </div>
        </>:
        <>
     <div className="sm:mt-0 flex gap-2">
              <button className=" text-sm linkedIn-button-filled flex gap-2 items-center">
                <FaUserFriends size={18} />
                Connect
              </button>
              <button className="text-sm linkedIn-button-outline">Message</button>
              <button className=" text-sm linkedIn-button-outline2 ">More</button>
          </div>
        </>

    }
  </>
  )
}

export default ProfileOptions