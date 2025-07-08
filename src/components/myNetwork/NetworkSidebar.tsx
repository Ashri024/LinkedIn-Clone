'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";

function NetworkSidebar() {
  const {data:session} = useSession();
  const [connectionsNumber, setConnectionsNumber] = useState(0);
  useEffect(() => {
    console.log("Fetching connections count for user ID:", session?.user?._id);
    // Simulate fetching connections count from an API
    const fetchConnectionsCount = async () => {
      if (!session?.user?._id) {
        return;
      }
      try {
        const response = await fetch(`/api/connection/count/${session?.user?._id}`); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          // console.log("No. of connections API response:", data);
          setConnectionsNumber(data.connectionCount?? 0); // Assuming the API returns { count: number }
        } else {
          console.error('Failed to fetch connections count');
        }
      } catch (error) {
        console.error('Error fetching connections count:', error);
      }
    };

    fetchConnectionsCount();
  }, [session?.user?._id]);
  return (
    <div className=" w-full bg-white dark:bg-backgroundC-dark rounded-md">
      <h3 className="font-semibold border-b py-4 px-4">Manage my network</h3>
      <div className="space-y-0 text-muted-foreground font-semibold ">
        <Link href="/myNetwork/invite-connect/connections/" className="flex hover:bg-white/10 transition justify-between py-3 px-4">
          <div className='flex items-center'>
            <div className='w-[35px]'>
              <FaUserFriends size={26}/>
            </div>
            <span>Connections</span>
          </div>
          <span>{connectionsNumber}</span>
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
