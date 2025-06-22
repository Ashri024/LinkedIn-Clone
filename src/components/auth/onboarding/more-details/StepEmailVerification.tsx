// 'use client';

// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import LoaderComponent from '@/components/LoaderComponent';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { checkUserProfile } from '@/lib/db/frontend/user';
// import toast from 'react-hot-toast';
// import { useOtpStore } from '@/store/userOtpStore';

// export default function StepEmailVerification() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [sendingOtp, setSendingOtp] = useState(false);
//   const [verifying, setVerifying] = useState(false);

//   const { otp: storedOtp, setOtp: storeOtp, clearOtp } = useOtpStore();

//   useEffect(() => {
//     const checkAndRedirect = async () => {
//       setLoading(true);
//       const hasProfile = await checkUserProfile(session?.user.email);
//       if (hasProfile !== 3) {
//         router.replace('/auth/onboarding/more-details');
//         return;
//       }
//       if (session?.user?.authProvider === 'google') {
//         router.replace('/auth/onboarding/more-details/profile-job-preference');
//         return;
//       }
//       setLoading(false);
//     };
//     checkAndRedirect();
//   }, [session, status, router]);

//   const sendOtp = async () => {
//     setSendingOtp(true);
//     try {
//       const res = await fetch('/api/send-otp', {
//         method: 'POST',
//       });

//       const data = await res.json();
//       if (res.ok) {
//         storeOtp(data.otp); // Save in zustand
//         toast.success('OTP sent to your email');
//         setOtpSent(true);
//       } else {
//         toast.error(data.message || 'Failed to send OTP');
//       }
//     } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
//       toast.error('Something went wrong while sending OTP');
//       console.error('OTP sending error:', err);
//     }
//     finally{
//     setSendingOtp(false);
//   }
//   };

//   const verifyOtp = async ( e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!otp || otp.length !== 6) {
//       toast.error('Please enter a valid 6-digit code');
//       return;
//     }

//     if (otp !== storedOtp) {
//       toast.error('Invalid OTP');
//       return;
//     }

//     setVerifying(true);
//     try {
//       await fetch('/api/profile', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ emailVerified: true, authStep: 4 }),
//       });

//       clearOtp();
//       toast.success('Email verified successfully!');
//       router.push('/auth/onboarding/more-details/profile-job-preference');
//     } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
//       toast.error('Verification failed');
//       console.error('Verification error:', err);
//     }
//     setVerifying(false);
//   };

//   if (loading || status === 'loading') {
//     return <LoaderComponent text="Checking Profile Status..." />;
//   }

//   return (
//     <form onSubmit={verifyOtp} className="space-y-4">
//       <h2 className="text-2xl font-semibold text-center">Confirm your email</h2>
//       <p className="text-sm text-center text-muted-foreground mb-4">
//         {/* Type in the code we sent to <strong>{session?.user?.email}</strong> */}
//         {otpSent ? (
//           <>Enter the 6-digit code sent to <strong>{session?.user?.email}</strong></>
//         ) : (
//           <>We will send a 6-digit code to <strong>{session?.user?.email}</strong>
//           <span className='underline cursor-pointer' onClick={() => router.push('/auth/onboarding/more-details/profile-email')}>
//             Edit Email?
//           </span>
//           </>
//         )}
//       </p>

//       <Input
//         placeholder="_ _ _ _ _ _"
//         maxLength={6}
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         className="text-center tracking-widest text-xl"
//       />

//       {!otpSent ? (
//         <div className="pt-6">
//           <Button className="w-full" onClick={sendOtp} disabled={sendingOtp}>
//             {sendingOtp ? 'Sending...' : 'Send OTP'}
//           </Button>
//         </div>
//       ) : (
//         <>
//           <p className="text-xs text-muted-foreground mt-2 text-center">
//           {sendingOtp?
//            'Sending...' 
//             : <> Didn&apos;t receive the code?{' '}
//             <span className="underline cursor-pointer" onClick={sendOtp}>
//               Send again
//             </span>
//             </>}
//           </p>

//           <div className="">
//             <Button className="w-full" disabled={verifying}>
//               {verifying ? 'Verifying...' : 'Agree & Confirm'}
//             </Button>
//           </div>
//         </>
//       )}
//     </form>
//   );
// }


'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoaderComponent from '@/components/LoaderComponent';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkUserProfile } from '@/lib/db/frontend/user';
import toast from 'react-hot-toast';
import { useOtpStore } from '@/store/userOtpStore';

export default function StepEmailVerification() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState(session?.user?.email || '');

  const { otp: storedOtp, setOtp: storeOtp, clearOtp } = useOtpStore();

  useEffect(() => {
    const checkAndRedirect = async () => {
      console.log("Session: ", session);
      setLoading(true);
      const hasProfile = await checkUserProfile(session?.user.email);
      if (hasProfile !== 3) {
        router.replace('/auth/onboarding/more-details');
        return;
      }
      if (session?.user?.authProvider === 'google') {
        router.replace('/auth/onboarding/more-details/profile-job-preference');
        return;
      }
      setLoading(false);
    };
    checkAndRedirect();
  }, [session, status, router]);

  const sendOtp = async () => {
    console.log('Sending OTP to:', newEmail);
    if (!newEmail || !newEmail.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }

    setSendingOtp(true);
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email: newEmail }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (res.ok) {
        storeOtp(data.otp);
        toast.success(`OTP sent to ${newEmail}`);
        setOtpSent(true);
        setEditingEmail(false);
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      toast.error('Something went wrong while sending OTP');
      console.error('OTP sending error:', err);
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    if (otp !== storedOtp) {
      toast.error('Invalid OTP');
      return;
    }

    setVerifying(true);
    try {
      if(newEmail !== session?.user?.email) {
          const res = await fetch('/api/profile/update-email', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: newEmail }),
          });
          
          if (!res.ok) {
            const errData = await res.json();
            console.error('Update email error:', errData);
            toast.error(errData.message || 'Failed to update email');
            throw new Error('Update email failed');
          }

          const newSession=await updateSession({ email:   newEmail }); // 🔄 Sync session email
          console.log('Session updated:', newSession);
          if (!newSession) throw new Error('Session update failed');
          toast.success('Email updated successfully!');
    }
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailVerified: true, authStep: 4 }),
      });
      toast.success('Email verified successfully!');
      clearOtp();
      router.push('/auth/onboarding/more-details/profile-job-preference');
    } catch (err) {
      toast.error('Verification failed');
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  if (loading || status === 'loading') {
    return <LoaderComponent text="Checking Profile Status..." />;
  }

  return (
    <form onSubmit={verifyOtp} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Confirm your email</h2>

      <p className="text-sm text-center text-muted-foreground mb-2">
        {otpSent ? (
          <>
            Enter the code sent to <strong>{newEmail}</strong>
          </>
        ) : (
          <>
            We will send a 6-digit code to <strong>{newEmail}</strong>
          </>
        )}
      </p>

      {editingEmail && (
        <Input
          placeholder="Enter new email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      )}

      { !editingEmail && (
        <p className="text-xs text-muted-foreground text-center">
          Wrong email?{' '}
          <span
            className="underline cursor-pointer"
            onClick={() => setEditingEmail(true)}
          >
            Edit email
          </span>
        </p>
      )}

      <Input
        placeholder="_ _ _ _ _ _"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="text-center tracking-widest text-xl"
      />

      {!otpSent || editingEmail ? (
        <Button
          className="w-full"
          onClick={sendOtp}
          disabled={sendingOtp}
          type="button"
        >
          {sendingOtp ? 'Sending...' : 'Send OTP'}
        </Button>
      ) : (
        <>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {sendingOtp ? (
              'Sending...'
            ) : (
              <>
                Didn&apos;t receive the code?{' '}
                <span className="underline cursor-pointer" onClick={sendOtp}>
                  Send again
                </span>
              </>
            )}
          </p>
          
          <Button className="w-full" disabled={verifying}>
            {verifying ? 'Verifying...' : 'Agree & Confirm'}
          </Button>
        </>
      )}
    </form>
  );
}
