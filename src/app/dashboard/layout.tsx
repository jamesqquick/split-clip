import FolderForm from './FolderForm';
import FolderList from './FolderList';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-screen flex ">
      <div className="border-r-2 h-screen overflow-auto   w-[300px]  border-gray-500 p-8">
        <FolderForm />
        <div className="h-1 bg-gray-700 my-8" />
        <FolderList />
      </div>
      <div className="p-10 overflow-auto h-screen">{children}</div>
    </div>
  );
}
