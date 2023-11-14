import React from 'react';
import FolderForm from '../../FolderForm';
import DashboardHeader from '../../DashboardHeader';

export default function NewFolderPage() {
  return (
    <div>
      <DashboardHeader title="New Folder" />
      <FolderForm />
    </div>
  );
}
