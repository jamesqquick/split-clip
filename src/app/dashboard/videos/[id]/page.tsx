import VideoEditor from '@/app/components/VideoEditor';
import DashboardHeader from '@/app/dashboard/DashboardHeader';
import { getXataClient } from '@/xata';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  const xataClient = getXataClient();
  const video = await xataClient.db.video
    .filter({
      id: params.id,
    })
    .getFirst();
  if (!video || !video.video) {
    redirect('/dashboard/videos');
  }

  return (
    <div>
      <DashboardHeader title={`Video`} />
      <VideoEditor src={video.video?.url} />
    </div>
  );
}
