'use client';
import ProgressBar from '@/app/components/ProgressBar';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DropEvent, useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';

export default function VideoForm({
  folders,
}: {
  folders: { id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const onDropAcceptedHandler = (files: File[], event: DropEvent) => {
    setLoading(true);
    setTimeout(() => {
      setProgress(80);
      setTimeout(() => {
        setProgress(100);
      }, 2000);
    }, 100);
  };
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      maxSize: 1000000000,
      accept: {
        'video/mp4': ['.mp4'],
      },
      onDropAccepted: onDropAcceptedHandler,
    });
  const searchParams = useSearchParams();
  const folderId = searchParams.get('folderId');

  return (
    <form
      action="http://localhost:3000/api/video"
      encType="multipart/form-data"
      id="videoForm"
      method="POST"
    >
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="folder"
        >
          Folder
        </label>
        <select
          id="folder"
          defaultValue={folderId || 'Folder 3'}
          className="text-gray-800 px-2 py-1 rounded-md"
        >
          <option value={''}>None</option>

          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 relative">
        <label
          className="sr-only block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload video
        </label>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div
            {...getRootProps({ className: 'dropzone' })}
            className="border border-gray-600 rounded-lg h-64 px-10 border-dashed flex flex-col items-center justify-center cursor-pointer relative"
          >
            <FaUpload className="w-10 h-10 text-indigo-100 mb-4" />
            <input {...getInputProps()} />
            <p className="text-center text-lg text-gray-400 mb-4">
              Drop here or click to select
            </p>
            <div className="h-4 w-full">
              {loading && <ProgressBar progress={progress} />}
            </div>
            {/* {!acceptedFiles.length && (
              <div className="flex justify-center items-center gap-x-1">
                <FaFileArchive />
                <p>No files selected</p>
              </div>
            )} */}
            {/* {acceptedFiles.length === 1 && <p>{acceptedFiles[0].name}</p>} */}
            <p className="h-4 absolute bottom-10 left-6">
              {fileRejections &&
                fileRejections.length > 0 &&
                fileRejections[0].errors[0].code === 'file-too-large' &&
                'File too large'}
            </p>
          </div>
        </div>
      </div>

      {/* <div className="mb-4">
        
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          accept="video/*"
          type="file"
        ></input>
      </div> */}

      <button className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
        Submit
      </button>
    </form>
  );
}
