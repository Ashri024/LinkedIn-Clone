// /app/api/send-otp/route.ts
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/sendEmail';
  // let apiCall = 0;
export async function POST(req: Request) {
// console.log('/route/send-otp: ', ++apiCall);
 
try{
    const {email} = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ message: 'Invalid Email' }, { status: 400 });
    }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendEmail(email, otp);

  return NextResponse.json({ message: 'OTP sent successfully', otp }); // Return OTP for Zustand
} catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Failed to send OTP' }, { status: 500 });
}
}
