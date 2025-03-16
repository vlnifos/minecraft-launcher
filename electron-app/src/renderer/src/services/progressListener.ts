import { AppDispatch } from '@renderer/store'
import { updateDownloadProgress, fetchDownloadedFiles } from '../store/slices/downloadsSlice'
import { Store } from '@reduxjs/toolkit'

export const setupProgressListener = (
  store: Store
): { subscribe: () => void; unsubscribe: () => void } => {
  let unsubscribe: any

  return {
    subscribe: (): void => {
      if (unsubscribe) {
        return
      }

      unsubscribe = window.electronAPI.onDownloadProgress((progress: any) => {
        store.dispatch(updateDownloadProgress(progress))

        if (progress.completed) {
          setTimeout(() => {
            const dispatch = store.dispatch as AppDispatch
            dispatch(fetchDownloadedFiles())
          }, 500)
        }
      })
    },
    unsubscribe: (): void => {
      if (unsubscribe) {
        unsubscribe()
        unsubscribe = null
      }
    }
  }
}
