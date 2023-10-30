import { VideoRecord } from '@/xata';

export default function VideoList({ videos }: { videos: VideoRecord[] }) {
  return (
    <div className="grid-cols-3 grid gap-8">
      {videos.map((video) => (
        <video
          className="max-h-[300px] h-auto w-full aspect-video max-w-4xl border border-gray-300 rounded-md"
          src={video.video?.url}
          key={video.id}
        />
      ))}
    </div>
  );
}
