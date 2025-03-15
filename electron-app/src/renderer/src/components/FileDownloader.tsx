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
      {/* Progress */}
      {isDownloading && !isInstallingInProgress && (
        <div>
          <span>Downloading... </span>
          <span>({Math.round(currentDownload.progress.percent * 100)}%)</span>
        </div>
      )}
      {isInstallingInProgress && <div>Installing...</div>}
    </div>
  )
}
