import { useSelector } from 'react-redux';

const DownloadProgress = () => {
  const progress = useSelector((state: any) => state.downloads.currentDownload.progress);

  if (!progress) {
    return null;
  }

  const { percent, transferredBytes, totalBytes } = progress;

  return (
    <div>
      <span>{percent}%</span>
      <span>{transferredBytes} / {totalBytes}</span>
    </div>
  )
}

export default DownloadProgress;