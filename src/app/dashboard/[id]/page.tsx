import VideoList from '@/app/components/VideoList';
import { getXataClient } from '@/xata';
import React, { useState } from 'react';

// function wait(milliseconds: number) {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// }

export default async function Page({ params }: { params: { id: string } }) {
  const xataClient = getXataClient();
  //   const folder = await xataClient.db.folder
  //     .filter({
  //       id: params.id,
  //     })
  //     .getFirst();
  //   const videos = await xataClient.db.video
  //     .filter({
  //       folder: {
  //         id: params.id,
  //       },
  //     })
  //     .getMany();

  const folder = await xataClient.db.folder
    .filter({
      id: params.id,
    })
    .select([
      '*',
      {
        name: '<-video.folder',
        columns: ['video.*'],
      },
    ])
    .getFirst();
  //   console.log(folder.videofolder.records[0].video);
  const videos = folder?.videofolder?.records;

  console.log(videos);
  console.log(videos);
  return (
    <div>
      <h1 className="text-4xl text-white font-bold uppercase mb-10">
        {folder.name}
      </h1>
      {!videos && (
        <div className="text-white text-2xl">No videos in this folder</div>
      )}
      {videos && <VideoList videos={videos} />}
    </div>
  );
}
