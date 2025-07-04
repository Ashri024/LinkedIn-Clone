'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import DefaultBanner from '@/../public/default-banner.svg';
// import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import SmallLoader from '@/components/SmallLoader';
import { MAX_FILE_SIZE } from '@/constants/GlobalConstants';

function UserBanner({bannerImageUrl, isOwner, email}: {bannerImageUrl: string | undefined, isOwner: boolean, email: string | undefined}) {
  // const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [bannerImage, setBannerImage] = useState<string | undefined>(bannerImageUrl);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("bannerImageUrl: ",bannerImageUrl);
    if (bannerImageUrl) {
      setBannerImage(bannerImageUrl);
    }
  }, [bannerImageUrl]);

  const handleBannerClick = () => {
    if ( fileInputRef.current && !loading && isOwner) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isOwner) return;
    const file = e.target.files?.[0];
    console.log("session.user.email: ", email);
    if (!file || !email) return;
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
      // PATCH profile with new bannerImageUrl
      const res= await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bannerImageUrl: uploadData.secure_url })
      });
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to update banner image');
        return;
      }
      setLoading(false); // Reset loading state
      setBannerImage(uploadData.secure_url); // Update banner image state
      const data = await res.json();
      console.log("Banner updated successfully: ", data);
      // Optionally, refresh the page or state here
      toast.success('Banner image updated successfully');
    }
  };

  return (
    <div className={`z-0 relative w-full h-44  dark:bg-backgroundC-dark ${loading?"cursor-not-allowed": isOwner? "cursor-pointer":"cursor-default"} `} onClick={handleBannerClick}>
      <SmallLoader loading={loading} />
      <Image
        src={bannerImage || DefaultBanner}
        alt="cover"
        fill
        className="object-cover"
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default UserBanner