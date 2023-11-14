'use client';
import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function DashboardNav() {
  const pathname = usePathname();
  const routeSegments = pathname.substring(1).split('/').slice(0, -1);
  let acculatedPath = '';
  const routeLinks = routeSegments.map((path) => {
    acculatedPath += `/${path}`;
    return {
      name: path,
      link: acculatedPath,
    };
  });

  return (
    <div className="mb-1 text-gray-300 flex gap-x-2">
      {routeLinks.map((routeLink, i) => (
        <span key={routeLink.link} className="flex gap-2 items-center">
          <Link href={`${routeLink.link}`} className=" cursor-pointer">
            {routeLink.name}
          </Link>
          {i < routeLinks.length - 1 && (
            <FaLongArrowAltRight className="inline" />
          )}
        </span>
      ))}
    </div>
  );
}
