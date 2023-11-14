import { useState } from 'react';

export default function ProgressBar({ progress = 10 }: { progress: number }) {
  return (
    <div className="relative pt-1 ">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-50">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-300 transition-all duration-1000"
        ></div>
      </div>
    </div>
  );
}
