// /components/profile/dialogs/ContactInfo.tsx
import { useDialogStore } from '@/store/dialogStore';
import EditContactInfo from './EditContactInfo';
import { IProfilePopulated } from '@/models/Profile';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { SiLinkedin } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { PiAddressBook } from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

export default function ContactInfo({   profile,isOwner,setProfile }: { profile: IProfilePopulated, isOwner: boolean,setProfile: (profile: IProfilePopulated) => void; }) {
  return (
    <div className="pb-4">
      <h2 className="text-xl font-semibold pb-4 border-b">{profile.firstName} {profile.lastName}</h2>
      <div className='mt-4 space-y-4'>
        <div className='flex justify-between items-center w-full '>
            <h3 className="text-xl">Contact Info</h3>
            {isOwner && (
        <button
          className="linkedIn-link mt-2"
          onClick={() =>
            useDialogStore.getState().openDialog(
              <EditContactInfo profile={profile} setProfile={setProfile} isOwner={isOwner} />
            )
          }
        >
          <Pencil className="text-theme-secondary" size={20} />
        </button>
      )}
        </div>

        <div className='flex gap-4'>
          <SiLinkedin className="text-theme-secondary mt-0.5 ml-0.5" size={22} />
          <div className='flex flex-col gap-1'>
            < span className='font-semibold'>{
              isOwner ? 'My profile URL' : profile.firstName + "'s profile URL"
            }</span>
            <Link href={`/profile/${profile.firstName.toLowerCase()}-${profile.lastName.toLowerCase()}-${profile._id}`} target="_blank" className="linkedIn-link text-sm">
            {`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${profile.firstName.toLowerCase()}-${profile.lastName.toLowerCase()}-${profile._id}`}
            </Link>
            </div>
        </div>
        <div className='flex gap-4'>
          <MdOutlineMail className="text-theme-secondary mt-0.5" size={25} />
          <div className='flex flex-col gap-1'>
            <span className='font-semibold'>Email:</span> 
            <Link href={`mailto:${profile.email}`} className="linkedIn-link text-sm">
            {profile.email}
            </Link>
          </div>
        </div>
        { profile.phone && <div className='flex gap-4'>
          <LuPhone className="text-theme-secondary mt-0.5" size={25} />
          <div className='flex flex-col gap-1'>
            <span className='font-semibold'>Phone:</span> 
            <Link href={` tel:+91${profile.phone}`} target="_blank" rel="noopener noreferrer"
              className="linkedIn-link text-sm">
            +91 {profile.phone}
            </Link>
          </div>
        </div>
        }
       {profile.address &&
          <div className='flex gap-4'>
          <PiAddressBook className="text-theme-secondary mt-0.5" size={25} />
          <div className='flex flex-col gap-1'>
            <span className='font-semibold'>Address:</span> 
            <div className=" text-theme-secondary text-sm">
            {profile.address} 
            </div>
          </div>
        </div>
       }

       { profile?.birthday?.day && profile?.birthday?.month &&
       <div className='flex gap-4'>
       <LiaBirthdayCakeSolid className="text-theme-secondary mt-0.5" size={25} />
       <div className='flex flex-col gap-1'>
         <span className='font-semibold'>Birthday:</span> 
         <div className=" text-theme-secondary text-sm">
         {profile?.birthday?.day+ " "+ profile?.birthday?.month} 
         </div>
       </div>
     </div>
       }
      </div>
     
    </div>
  );
}
