import Container from '@/components/Container';
import { ProfileAbout } from '@/components/profile/ProfileAbout';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileSummary } from '@/components/profile/ProfileSummary';
import { ProfileFeatured } from '@/components/profile/ProfileFeatured';
import { ProfileActivity } from '@/components/profile/ProfileActivity';

export default function ProfilePage() {
  return (
    <Container>
      <main className="flex flex-col md:flex-row items-center md:items-start md:justify-center gap-5 pt-4 pb-16">
        <div className="space-y-2 w-full max-w-[580px] min-[768px]:max-w-[400px] min-[1024px]:max-w-[630px] min-[1200px]:max-w-[800px]">
          <ProfileSummary />
          <ProfileAbout />
          <ProfileFeatured />
          <ProfileActivity />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-[580px] md:max-w-[300px]">
          <ProfileSidebar />
          
        </div>
      </main>
    </Container>
  );
}
