import Link from 'next/link';
import FolderForm from './FolderForm';
import FolderList from './FolderList';
import RecentFolders from './RecentFolders';
import RecentVideos from './RecentVideos';
import DashboardHeader from './DashboardHeader';

export default function page() {
  return (
    <div>
      <DashboardHeader title="Dashboard" />
      <div className="bg-gray-800 p-10 mb-10 rounded-md">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-xl font-bold mb-4">Folders</h2>
          <a
            href="/dashboard/folders/new"
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            + Add Folder
          </a>
        </div>
        <RecentFolders />
        <div className="flex justify-end mt-4">
          <Link href="/dashboard/folders" className="underline text-gray-300 ">
            All Folders
          </Link>
        </div>
      </div>
      <div className="bg-gray-800 p-10 mb-10 rounded-md">
        <div className="flex justify-between items-center mb-6 ">
          <h2 className="text-xl font-bold mb-4">Recent Videos</h2>

          <a
            href="/dashboard/videos/new"
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            + Add Video
          </a>
        </div>
        <RecentVideos />
        <div className="flex justify-end mt-4">
          <Link href="/dashboard/videos" className="underline text-gray-300">
            All Videos
          </Link>
        </div>
      </div>
    </div>
  );
}
