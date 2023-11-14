import { Folder, FolderRecord } from '@/xata';
import Link from 'next/link';
import React from 'react';

export default function FolderLink({ folder }: { folder: FolderRecord }) {
  return (
    <Link
      href={`/dashboard/folders/${folder.slug}`}
      className="text-gray-300 bg-gray-700  rounded-md hover:bg-gray-600 hover:bg-opacity-50 transition-all hover:text-gray-200 py-2 px-4 line-clamp-1"
    >
      {folder.name}
    </Link>
  );
}
