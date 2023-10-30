import { FolderRecord, getXataClient } from '@/xata';
import Folder from './Folder';

export default async function FolderList() {
  const xataClient = getXataClient();
  const folders: FolderRecord[] = await xataClient.db.folder.getMany();
  return (
    <div className="grid gap-y-2">
      {folders.map((folder) => (
        <Folder folder={folder} key={folder.id} />
      ))}
    </div>
  );
}
