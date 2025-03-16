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
    <div>
      {(isDownloading || isInstallingInProgress) && (
        <div className="flex justify-center items-center h-full w-full mt-24 text-white text-5xl font-bold">
          {/* Progress */}
          {isDownloading && !isInstallingInProgress && (
            <div className="flex justify-center items-center h-full w-full">
              <span>Downloading... </span>
              <span>({Math.round(currentDownload.progress.percent * 100)}%)</span>
            </div>
          )}
          {isInstallingInProgress && <div>Installing...</div>}
        </div>
      )}
    </div>
  )
}
