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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
    <body className={`${roboto.variable} font-roboto antialiased`} suppressHydrationWarning>
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
