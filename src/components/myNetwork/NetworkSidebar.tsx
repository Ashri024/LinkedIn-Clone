'use client';

import Link from 'next/link';
import { FaUserFriends } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";

function NetworkSidebar() {
  return (
    <div className=" w-full bg-white dark:bg-backgroundC-dark rounded-lg">
      <h3 className="font-semibold border-b py-4 px-4">Manage my network</h3>
      <div className="space-y-0 text-muted-foreground font-semibold ">
        <Link href="/myNetwork/invite-connect/connections/" className="flex hover:bg-white/10 transition justify-between py-3 px-4">
          <div className='flex items-center'>
            <div className='w-[35px]'>
              <FaUserFriends size={26}/>
            </div>
            <span>Connections</span>
          </div>
          <span>1501</span>
        </Link>
        <Link href="/myNetwork/network-manager/people-follow/followers" className="flex justify-between py-3 hover:bg-white/10 px-4">
          {/* <span>Following & Followers</span> */}
          <div className='flex items-center'>
            <div className='w-[35px]'>
              <FaUser size={20}/>
            </div>
            <span>Following & Followers</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NetworkSidebar;
