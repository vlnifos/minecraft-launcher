import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDownloadedFiles } from '../store/slices/downloadsSlice';
import { formatFileSize } from '../utils/helpers';

const FileList = () => {
  const dispatch = useDispatch();
  const { downloads, status } = useSelector((state: any) => state.downloads);

  const handleRefresh = () => {
    dispatch(fetchDownloadedFiles());
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Скачанные файлы</h2>
        <button
          onClick={handleRefresh}
          className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Обновить
        </button>
      </div>

      {status === 'loading' && (
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}

      {status !== 'loading' && downloads.length === 0 && (
        <p className="text-gray-500 p-4 text-center border rounded">Нет скачанных файлов</p>
      )}

      {status !== 'loading' && downloads.length > 0 && (
        <ul className="border rounded divide-y">
          {downloads.map((file, index) => (
            <li key={index} className="p-3 hover:bg-gray-50 flex justify-between items-center">
              <span className="font-medium truncate">{file.name}</span>
              <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                {formatFileSize(file.size)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;