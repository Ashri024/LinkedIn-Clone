import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions'; // where your auth config lives
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/Logout/LogoutButton';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  

  if (!session) {
    redirect('/auth/signup'); // ⛔ no session, redirect
  }

  return <div>
    Welcome to LinkedIn Home
    <LogoutButton/>
  </div>;
}
