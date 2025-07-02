"use client";
import Container from '../Container';
import { ProfileAbout } from '@/components/profile/ProfileAbout';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileSummary } from '@/components/profile/ProfileSummary';
import { ProfileFeatured } from '@/components/profile/ProfileFeatured';
import { ProfileActivity } from '@/components/profile/ProfileActivity';
import { ProfileExperience } from '@/components/profile/ProfileExperience';
import { ProfileEducation } from '@/components/profile/ProfileEducation';
import { ProfileSkills } from '@/components/profile/ProfileSkills';
import { ProfileFooter } from '@/components/profile/ProfileFooter';
import { IProfilePopulated } from '@/models/Profile';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import LoaderComponent from '../LoaderComponent';

// export default function ProfileLayout({ profile, isOwner }: { profile: IProfilePopulated, isOwner: boolean }) {
export default function ProfileLayout({ mongoDbId }: { mongoDbId: string | undefined }) {
  // Fetch the profile data based on mongoDbId
  const [profile, setProfile] = useState<IProfilePopulated | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const {data:session} = useSession();
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`/api/profile/${mongoDbId}`, { cache: 'no-store' });
      if (!res.ok) {
        const errorData = await res.json();
        console.error(errorData.error || 'Failed to fetch profile');
        return;
      }
      const profileData: IProfilePopulated = await res.json();
      setProfile(profileData);
      // Assuming you have a way to determine if the user is the owner
      // This could be from session data or another API call
      setIsOwner(session?.user?._id === profileData._id);
      // console.log("Fetched profile: ", profileData);
    }
    fetchProfile();
  }, [mongoDbId, session?.user?._id]);
if (!profile) {
    return <LoaderComponent text="Loading profile..." />;
  }
  return (
    <Container>
      <main className="flex flex-col md:flex-row px-2 gap-5 md:px-0 lg:px-10 pt-4 pb-16">
        <div className="space-y-4 w-full">
          <ProfileSummary profile={profile} isOwner={isOwner} />
          <ProfileAbout />
          <ProfileFeatured />
          <ProfileActivity />
          <ProfileExperience />
          <ProfileEducation />
          <ProfileSkills />
        </div>
        <div className="flex flex-col gap-4 w-full max-w-[300px]">
          <ProfileSidebar />
        </div>
      </main>
      <ProfileFooter />
    </Container>
  );
}
