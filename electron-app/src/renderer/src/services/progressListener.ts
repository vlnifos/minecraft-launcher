import { updateDownloadProgress, fetchDownloadedFiles } from '../store/slices/downloadsSlice'

export const setupProgressListener = (store) => {
  let unsubscribe: any;

  return {
    subscribe: () => {
      if (unsubscribe) {
        return
      }

      unsubscribe = (window as any).electronAPI.onDownloadProgress((progress: any) => {
        console.log('progress123123', progress);
        store.dispatch(updateDownloadProgress(progress))

        if (progress.completed) {
          setTimeout(() => {
            store.dispatch(fetchDownloadedFiles());
          }, 500);
        }
      });
    },
    unsubscribe: () => {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    }
  }
}