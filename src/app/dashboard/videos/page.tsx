import React from 'react';
import VideoList from '@/app/components/VideoList';
import { getXataClient } from '@/xata';
import DashboardHeader from '../DashboardHeader';

export default async function VideosPage() {
  const xataClient = getXataClient();
  const recentVideos = await xataClient.db.video
    .sort('xata.createdAt', 'desc')
    .getMany({
      pagination: {
        size: 10,
      },
    });
  return (
    <>
      <DashboardHeader title="Video">
        <a
          href="/dashboard/videos/new"
          className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          + Add Video
        </a>
      </DashboardHeader>
      <VideoList videos={recentVideos} />
    </>
  );
}
