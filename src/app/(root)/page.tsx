import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions'; // where your auth config lives
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin'); // ⛔ no session, redirect
  }

  return <div>Welcome to LinkedIn Home</div>;
}
