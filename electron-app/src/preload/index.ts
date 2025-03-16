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
      downloadFile: (url, filename, isModpack) =>
        ipcRenderer.invoke('download-file', { url, filename, isModpack }),

      downloadFileManual: (url, filename) =>
        ipcRenderer.invoke('download-file-manual', { url, filename }),

      getDownloadsPath: () => ipcRenderer.invoke('get-downloads-path'),

      getDownloadedFiles: () => ipcRenderer.invoke('get-downloaded-files'),

      extractZip: (zipPath, filename, isModpack) => {
        return ipcRenderer.invoke('extract-zip', { zipPath, filename, isModpack })
      },

      getDirectories: () => ipcRenderer.invoke('get-directories'),

      getJavaDirectory: () => ipcRenderer.invoke('get-java-directory'),

      onDownloadProgress: (callback) => {
        const progressHandler = (_, data): void => callback(data)

        console.log('progressHandler', progressHandler)

        ipcRenderer.on('download-progress', progressHandler)

        return (): void => {
          ipcRenderer.removeListener('download-progress', progressHandler)
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
