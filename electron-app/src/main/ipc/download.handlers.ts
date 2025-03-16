import { ipcMain, BrowserWindow } from 'electron'
import { DownloadService } from '../services/download.service'

export function setupDownloadHandlers(_: BrowserWindow, downloadService: DownloadService): void {
  ipcMain.handle('download-file', async (_, options) => {
    return downloadService.downloadFile(options)
  })
}
