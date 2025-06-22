// app/(protected)/layout.tsx
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';
import { userExistStatus } from '@/lib/db/backend/user';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const exists = await userExistStatus(session?.user.email);
  // handle code -1, 0, 1, 2
  if (exists === -1) {
    redirect('/auth/signup'); // No session or email, redirect to sign-in page
  } else if (exists === 0) {
    redirect('/auth/onboarding'); // Session email exists but user in db does not exist, redirect to onboarding page
  } else if(exists >= 1 && exists <= 4) {
    redirect('/auth/onboarding/more-details'); // User exists but needs more details
  } 
  return <>{children}</>;
}
