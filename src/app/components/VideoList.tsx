import { VideoRecord } from '@/xata';

export default function VideoList({ videos }: { videos: VideoRecord[] }) {
  return (
    <div className="md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid gap-8">
      {videos.map((video) => (
        <a
          key={video.id}
          href={`/dashboard/videos/${video.id}`}
          className="group"
        >
          <p className="text-gray-200">{video.fileName}</p>
          <div className="max-h-[300px] h-auto w-full aspect-video overflow-hidden border border-gray-300 rounded-md ">
            <video
              className=" w-full max-w-4xl group-hover:scale-105 transition-transform "
              src={video.video?.url}
            />
          </div>
        </a>
      ))}
    </div>
  );
}
