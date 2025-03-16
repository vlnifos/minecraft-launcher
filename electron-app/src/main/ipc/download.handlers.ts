import { ipcMain, BrowserWindow } from 'electron'
import { DownloadService } from '../services/download.service'

export function setupDownloadHandlers(
  mainWindow: BrowserWindow,
  downloadService: DownloadService
): void {
  ipcMain.handle('download-file', async (event, options) => {
    return downloadService.downloadFile(options)
  })
}
