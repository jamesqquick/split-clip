import { FolderRecord, getXataClient } from '@/xata';
import FolderLink from './FolderLink';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

export default async function RecentFolders() {
  const xataClient = getXataClient();
  const { userId } = auth();
  if (!userId) {
    redirect('/');
  }
  const folders: FolderRecord[] = await xataClient.db.folder
    .filter({
      userId,
    })
    .sort('xata.updatedAt', 'desc')
    .getMany({
      pagination: { size: 4 },
    });
  return (
    <div>
      {folders.length === 0 && <p>Create a folder to get started.</p>}
      {folders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {folders.map((folder) => (
            <FolderLink folder={folder} key={folder.id} />
          ))}
        </div>
      )}
    </div>
  );
}
