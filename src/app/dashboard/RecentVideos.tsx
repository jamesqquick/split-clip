import { getXataClient } from '@/xata';
import React from 'react';
import VideoList from '../components/VideoList';

export default async function RecentVideos() {
  const xataClient = getXataClient();
  const recentVideos = await xataClient.db.video
    .sort('xata.createdAt', 'desc')
    .getMany({
      pagination: {
        size: 10,
      },
    });
  return <VideoList videos={recentVideos} />;
}
