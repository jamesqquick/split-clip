'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const navigation = [{ name: 'Dashboard', href: '/dashboard' }];
export default function Nav() {
  const { user, isLoaded } = useUser();

  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-r-0 border-b-gray-600"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            Split Clip
          </a>
        </div>

        <div className=" flex flex-1 justify-end gap-x-4 items-center">
          {isLoaded && user && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
          {isLoaded && !user && (
            <Link
              href="/sign-in"
              className="text-sm font-semibold leading-6 text-white"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
