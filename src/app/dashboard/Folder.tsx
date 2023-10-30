import { Folder, FolderRecord } from '@/xata';
import Link from 'next/link';
import React from 'react';

export default function Folder({ folder }: { folder: FolderRecord }) {
  return (
    <Link
      href={`/dashboard/${folder.id}`}
      className="text-gray-400 bg-transparent rounded-md hover:bg-gray-600 hover:bg-opacity-50 p-4 transition-all hover:text-gray-200 uppercase text-xl"
    >
      {folder.name}
    </Link>
  );
}
