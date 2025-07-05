"use client";
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import DefaultProfile from '@/../public/default-profile.svg';
import Image from 'next/image';
import SmallLoader from '@/components/SmallLoader';
import { MAX_FILE_SIZE } from '@/constants/GlobalConstants';

function UserProfile({profileImageUrl, isOwner}: {profileImageUrl?: string | undefined, isOwner?: boolean}) {
    const { data: session } = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profileImage, setProfileImage] = useState<string | undefined>(profileImageUrl);
    const [loading, setLoading] = useState<boolean>(false);
    
      // If profileImageUrl is provided, use it; otherwise, use the default profile image
      useEffect(() => {
        // console.log("profileImageUrl: ", profileImageUrl);
        if (profileImageUrl) {
          setProfileImage(profileImageUrl);
        }
      }, [profileImageUrl]);
    
      // Handle image click to trigger file input
    
    const handleImageClick = () => {
        // Only allow upload if the current image is the default
        // console.log("profileImageUrl: ", profileImage);
        if (fileInputRef.current && !loading && isOwner) {
          fileInputRef.current.click();
        }
      };
    
      const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!isOwner) return; // If not owner, do nothing
        const file = e.target.files?.[0];
        if (!file || !session?.user?.email) return;
        if (file.size > MAX_FILE_SIZE) {
          toast.error("File size exceeds 10MB. Please upload a smaller image.");
          return;
        }
        // Upload to /api/upload
        const formData = new FormData();
        formData.append('file', file);

        setLoading(true); // Set loading state to true while uploading
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        const uploadData = await uploadRes.json();
        if (uploadData.secure_url) {
            // PATCH profile with new profileImageUrl
            const res= await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profileImageUrl: uploadData.secure_url })
            });
            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message || 'Failed to update profile image');
                return;
            }
            setProfileImage(uploadData.secure_url); // Update state with new image URL
            setLoading(false); // Set loading state to false after upload
            await res.json();
    
          toast.success('Profile image updated successfully');
          // Optionally, refresh the page or state here
        }
      };
    
  return <div>
    <div onClick={handleImageClick} className="w-fit relative -mt-30 px-4 sm:px-6 pb-4">
      <div className={`w-[140px] h-[140px] rounded-full overflow-hidden relative border-white dark:border-backgroundC-dark border-4 bg-white dark:bg-backgroundC-dark ${loading?"cursor-not-allowed": isOwner? "cursor-pointer":"cursor-default"} `}>
         <SmallLoader loading={loading} />
            <Image
            src={profileImage || DefaultProfile}
            alt="avatar"
            width={140}
            height={140}
            className=" w-full h-full object-center  object-cover"
            />
            <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            />
      </div>
    </div>
    </div>

}

export default UserProfile