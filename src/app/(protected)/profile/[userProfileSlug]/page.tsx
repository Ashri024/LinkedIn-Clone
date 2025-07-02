// /profile/[userProfileSlug]/page.tsx
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/authOptions';
// import { IProfilePopulated } from '@/models/Profile';
import ProfileLayout from '@/components/profile/ProfileLayout';

export default async function ProfilePage({ params }:  { params: Promise<{ userProfileSlug: string }> }) {
  const { userProfileSlug } = await params;
  const slugParts = userProfileSlug.split('-');
  const mongoDbId = slugParts[slugParts.length - 1];

  // const session = await getServerSession(authOptions);
  // const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  // const res = await fetch(`${baseUrl}/api/profile/${mongoDbId}`, { cache: 'no-store' });
  // if (!res.ok) {
  //   const errorData = await res.json();
  //   // toast.error(errorData.error || 'Failed to fetch profile');
  //   return <div className="text-center mt-20 text-theme background-theme">{errorData.error || 'Failed to fetch profile'}</div>;
  // }
  // const profile: IProfilePopulated = await res.json();
  // const isOwner = session?.user?._id === profile._id;

  // if (!profile) {
  //   return <div className="text-center mt-10">Profile not found</div>;
  // }
  // return <ProfileLayout profile={profile} isOwner={isOwner} />;
  return <ProfileLayout mongoDbId={mongoDbId} />; // Assuming params is passed correctly to ProfileLayout
}
