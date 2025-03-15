import { useSelector } from 'react-redux'
import { RootState } from '..'

export const useSelectIsJavaInstalled = (): boolean =>
  useSelector((state: RootState) => state.modpacks.installedJava.length > 0)

export const useSelectIsDownloading = (): boolean =>
  useSelector(
    (state: RootState) =>
      state.downloads.currentDownload.active && state.downloads.currentDownload.progress
  )

export const useSelectIsInstallingInProgress = (): boolean =>
  useSelector((state: RootState) => state.modpacks.isInstallingInProgress)
