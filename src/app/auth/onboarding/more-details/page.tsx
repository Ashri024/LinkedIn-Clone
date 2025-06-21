"use client"
import LoaderComponent from '@/components/LoaderComponent';
import { Button } from '@/components/ui/button'
import { checkUserProfile } from '@/lib/db/frontend/user';
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function MoreDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAndRedirect = async () => {
        setLoading(true);
        const hasProfile = await checkUserProfile(session?.user.email || undefined);
        console.log('User exists after session check login:', hasProfile);
        if(hasProfile === -1) {
          // Session email does not exist in browser
          router.replace('/auth/signup');
          return;
        } else if (hasProfile ===0) {
          router.replace('/auth/onboarding');
          return;
        } else if (hasProfile === 2) {
          router.replace('/');
          return;
        }
        setLoading(false);
    };
    checkAndRedirect();
  }, [session, router]);
 
  if (loading || status === 'loading') {
    return <LoaderComponent text='Checking Profile Status...' />;
  }
  return (
    <div>
      <Button variant ="destructive" onClick={()=> signOut()}>
        Logout
      </Button>
    </div>
  )
}

export default MoreDetailsPage