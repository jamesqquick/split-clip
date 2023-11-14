import React from 'react';
import DashboardHeader from '../../DashboardHeader';
import VideoForm from '../../folders/[slug]/upload/VideoForm';
import { FolderRecord, getXataClient } from '@/xata';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function NewVideoPage() {
  const xataClient = getXataClient();

  const { userId } = auth();
  if (!userId) {
    redirect('/');
  }
  const folders: FolderRecord[] = await xataClient.db.folder
    .filter({
      userId,
    })
    .sort('xata.createdAt', 'desc')
    .getMany();
  const folderDetails = folders.map((folder) => ({
    name: folder.name,
    id: folder.id,
  }));
  return (
    <div>
      <DashboardHeader title="Upload a Video" />
      <VideoForm folders={folderDetails} />
    </div>
  );
}
