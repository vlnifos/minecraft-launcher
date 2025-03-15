import { useSelector } from 'react-redux'
import type { RootState } from '../store'

export default function FileDownloader(): JSX.Element {
  const currentDownload = useSelector((state: RootState) => state.downloads.currentDownload)

  return (
    <div>
      {/* Progress */}
      <div>
        <span>progress</span>
        {currentDownload.progress && currentDownload.active && (
          <>
            <span>{Math.round(currentDownload.progress.percent * 100)}%</span>
            <div></div>
          </>
        )}
      </div>
    </div>
  )
}
