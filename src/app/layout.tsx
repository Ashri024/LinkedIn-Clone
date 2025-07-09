import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from './providers/SessionProvider';
import { ThemeProvider } from "next-themes";
import { Toaster } from 'react-hot-toast';

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "LinkedIn-Clone (By Ashri)",
  description: "A LinkedIn clone built with Next.js, TypeScript, and Tailwind CSS. It features user authentication, profile management, and a feed for posts. The application is designed to mimic the core functionalities of LinkedIn, allowing users to connect, share updates, and engage with content. Made by Ashri Mallick",
  openGraph: {
    title: "LinkedIn-Clone (By Ashri)",
    description: "A LinkedIn clone built with Next.js, TypeScript, and Tailwind CSS. It features user authentication, profile management, and a feed for posts. The application is designed to mimic the core functionalities of LinkedIn, allowing users to connect, share updates, and engage with content. Made by Ashri Mallick",
    url: "https://linkedin-clone-ashri.vercel.app/",
    siteName: "LinkedIn-Clone",
    images: [
      {
        url: "https://res.cloudinary.com/djnhadxeb/image/upload/v1752075551/9be712c2-dce2-4899-82ca-b1ffe5eb4958.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
    <body className={`${roboto.variable} font-roboto antialiased background-theme min-h-screen`} suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthSessionProvider>
        <Toaster position="top-right" />
          {children}
        </AuthSessionProvider>
      </ThemeProvider>
    </body>
  </html>
  );
}
