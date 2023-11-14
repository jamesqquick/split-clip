import React from 'react';
import FolderList from '../FolderList';
import DashboardHeader from '../DashboardHeader';

export default function page() {
  return (
    <>
      <DashboardHeader title="Folder" />
      <FolderList />
    </>
  );
}
