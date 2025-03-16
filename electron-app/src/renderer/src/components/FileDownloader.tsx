import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import {
  useSelectIsDownloading,
  useSelectIsInstallingInProgress
} from '@renderer/store/hooks/selectors'

export default function FileDownloader(): JSX.Element {
  const currentDownload = useSelector((state: RootState) => state.downloads.currentDownload)
  const isDownloading = useSelectIsDownloading()
  const isInstallingInProgress = useSelectIsInstallingInProgress()

  return (
    <div className="flex justify-center items-center h-full w-full text-white text-5xl font-bold">
      {/* Progress */}
      {isDownloading && !isInstallingInProgress && (
        <div className="flex justify-center items-center h-full w-full m-20">
          <span>Downloading... </span>
          <span>({Math.round(currentDownload.progress.percent * 100)}%)</span>
        </div>
      )}
      {isInstallingInProgress && <div>Installing...</div>}
    </div>
  )
}
