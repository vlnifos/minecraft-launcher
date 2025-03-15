import { updateDownloadProgress, fetchDownloadedFiles } from '../store/slices/downloadsSlice'

export const setupProgressListener = (
  store: any
): { subscribe: () => void; unsubscribe: () => void } => {
  let unsubscribe: any

  return {
    subscribe: (): void => {
      if (unsubscribe) {
        return
      }

      unsubscribe = (window as any).electronAPI.onDownloadProgress((progress: any) => {
        console.log('progress123123', progress)
        store.dispatch(updateDownloadProgress(progress))

        if (progress.completed) {
          setTimeout(() => {
            store.dispatch(fetchDownloadedFiles())
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
