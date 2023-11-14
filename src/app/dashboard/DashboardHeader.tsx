import React from 'react';
import DashboardNav from './DashboardNav';

export default function DashboardHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <DashboardNav />
      <div className="flex justify-between items-center mb-20">
        <h1 className="text-4xl font-bold ">{title}</h1>
        {children}
      </div>
    </>
  );
}
