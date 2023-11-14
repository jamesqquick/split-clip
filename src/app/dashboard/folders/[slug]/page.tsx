import VideoList from '@/app/components/VideoList';
import { getXataClient } from '@/xata';
import React, { useState } from 'react';
import DashboardHeader from '../../DashboardHeader';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// function wait(milliseconds: number) {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// }

export default async function Page({ params }: { params: { slug: string } }) {
  const xataClient = getXataClient();
  const folder = await xataClient.db.folder
    .filter({
      slug: params.slug,
    })
    .getFirst();
  const videos = await xataClient.db.video
    .filter({
      folder: {
        slug: params.slug,
      },
    })
    .getMany();

  if (!folder) {
    redirect('/dashboard/folders');
  }

  //   const folder = await xataClient.db.folder
  //     .filter({
  //       id: params.id,
  //     })
  //     .select([
  //       '*',
  //       {
  //         name: '<-video.folder',
  //         columns: ['video.*'],
  //       },
  //     ])
  //     .getFirst();
  //   //   console.log(folder.videofolder.records[0].video);
  //   const videos = folder?.videofolder?.records;

  return (
    <div>
      <DashboardHeader title={folder.name}>
        <a
          href={`/dashboard/videos/new?folderId=${folder.id}`}
          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          + Add Video
        </a>
      </DashboardHeader>
      {(!videos || !videos.length) && (
        <div className="text-center">
          <p className="text-gray-100 text-xl">No videos in this folder.</p>
        </div>
      )}
      {videos && <VideoList videos={videos} />}
    </div>
  );
}
