import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/ToastContainer';
import AiChatWidget from '@/components/AiChatWidget';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FitSphere AI — Smart Gym & Fitness Management Platform',
  description:
    'Next-generation fitness platform combining AI gym equipment recognition, custom Indian diet planning, Amazon/Flipkart supplement comparisons, and trainer scheduling.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500 selection:text-black">
        <AppProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <AiChatWidget />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
