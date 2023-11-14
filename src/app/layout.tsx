import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from './components/Nav';
import Hero from './components/Hero';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Split Clip',
  description: 'AI editor for splitting short interviews',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-900 min-h-screen">
          <Nav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
