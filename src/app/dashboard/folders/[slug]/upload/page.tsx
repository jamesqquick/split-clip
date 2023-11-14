import DashboardHeader from '@/app/dashboard/DashboardHeader';
import VideoForm from './VideoForm';

export default function UploadPage() {
  return (
    <div>
      <DashboardHeader title="New Video" />
      <VideoForm />
    </div>
  );
}
