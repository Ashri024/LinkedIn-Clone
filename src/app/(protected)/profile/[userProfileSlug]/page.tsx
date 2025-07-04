import ProfileLayout from '@/components/profile/ProfileLayout';

export default async function ProfilePage({ params }:  { params: Promise<{ userProfileSlug: string }> }) {
  const { userProfileSlug } = await params;
  const slugParts = userProfileSlug.split('-');
  const mongoDbId = slugParts[slugParts.length - 1];
  return <ProfileLayout mongoDbId={mongoDbId} />; // Assuming params is passed correctly to ProfileLayout
}
