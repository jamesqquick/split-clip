import DashboardNav from './DashboardNav';
import FolderForm from './FolderForm';
import FolderList from './FolderList';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-10 max-w-7xl mx-auto">{children}</div>;
}
