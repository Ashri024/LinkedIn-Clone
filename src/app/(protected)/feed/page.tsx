
import { FeedSidebar } from '@/components/feed/Sidebar';
import { NewsPanel } from '@/components/feed/NewsPanel';
import Container from '@/components/Container';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import PostComponent from '@/components/post/PostComponent';

export default async function FeedPage() {
  const session = await getServerSession(authOptions)
  return (
    <Container>
        {/* Left Sidebar */}
        <aside className="hidden md:block w-full max-w-[230px]">
        {/* <aside className="block lg:block w-full max-w-xs"> */}
          <FeedSidebar user={session?.user} />
        </aside>

        {/* Main Feed */}
       
          <PostComponent/>

        {/* Right News Panel */}
        <aside className="hidden lg:block w-full max-w-[300px]">
          <NewsPanel />
        </aside>
        </Container>
  );
}
