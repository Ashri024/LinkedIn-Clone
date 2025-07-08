
import { Card, CardContent } from '@/components/ui/card';
import UserBanner from './ProfileSummary/UserBanner';
import UserAbout from './ProfileSummary/UserAbout';
import UserSchool from './ProfileSummary/UserSchool';
import ProfileOptions from './ProfileSummary/ProfileOptions';
import UserProfile from './ProfileSummary/UserProfile';
import { IProfile } from '@/models/Profile';
import { Pencil } from 'lucide-react';

export const ProfileSummary = ({profile, isOwner}: {profile: IProfile, isOwner: boolean}) => {
  return (
    <Card className="w-full overflow-hidden p-0 border-0 dark:bg-backgroundC-dark relative">
      <UserBanner bannerImageUrl={profile.bannerImageUrl} isOwner={isOwner} email={profile.email} />
      <UserProfile profileImageUrl={profile.profileImageUrl} isOwner={isOwner} />
      <CardContent className="relative -mt-8 flex flex-col gap-4 px-4 sm:px-6 pb-4 z-10">
      { isOwner && <button className="absolute -top-10 right-4 textrounded-full p-2">
        <Pencil size={20} />
      </button> }
        <UserAbout 
        isOwner={isOwner}
        initialProfile={profile}/>
        
        <UserSchool
        initialProfile={profile}
        />
        <ProfileOptions isOwner={isOwner} userId={profile._id}/>
      </CardContent>
    </Card>
  );
};
