// app/(protected)/layout.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';
import { doesUserExist } from '@/lib/db/backend/user';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) {
    redirect('/auth/signup'); // Or /auth/signin if you prefer
  }
  const exists = await doesUserExist(session.user.email);
  console.log('User exists:', exists, 'Email:', session.user.email);
  if (!exists) {
    redirect('/auth/onboarding');
  }
  return <>{children}</>;
}
