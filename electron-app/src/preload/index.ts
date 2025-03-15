import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('electronAPI', {
      // API для скачивания файлов
      downloadFile: (url, filename) =>
        ipcRenderer.invoke('download-file', { url, filename }),

      downloadFileManual: (url, filename) =>
        ipcRenderer.invoke('download-file-manual', { url, filename }),

      // API для работы с директорией скачиваний
      getDownloadsPath: () =>
        ipcRenderer.invoke('get-downloads-path'),

      getDownloadedFiles: () =>
        ipcRenderer.invoke('get-downloaded-files'),

      extractZip: (zipPath, filename) => {
        console.log('extractZip preload', zipPath, filename);
        return ipcRenderer.invoke('extract-zip', { zipPath, filename })
      },

      getDirectories: () =>
        ipcRenderer.invoke('get-directories'),

      onDownloadProgress: (callback) => {
        // Обработчик события прогресса
        const progressHandler = (_, data) => callback(data);

        console.log('progressHandler', progressHandler);

        // Подписываемся на событие
        ipcRenderer.on('download-progress', progressHandler);

        // Возвращаем функцию для отписки при необходимости
        return () => {
          ipcRenderer.removeListener('download-progress', progressHandler);
        };
      }
    });
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
