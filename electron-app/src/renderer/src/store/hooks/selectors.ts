import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '..'

export const useSelectIsJavaInstalled = (): boolean =>
  useSelector((state: RootState) => state.modpacks.installedJava.length > 0)

export const useSelectIsDownloading = (): boolean =>
  useAppSelector(
    (state) =>
      (state.downloads.currentDownload.active &&
        state.downloads.currentDownload.progress &&
        state.downloads.currentDownload.progress.totalBytes > 0) ||
      !!state.downloads.currentDownload.progress
  )

export const useSelectIsInstallingInProgress = (): boolean =>
  useSelector((state: RootState) => state.modpacks.isInstallingInProgress)

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
