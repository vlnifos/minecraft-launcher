import { BrowserWindow } from 'electron'
import { download } from 'electron-dl'
import * as path from 'path'
import { PATHS } from '../config/paths'

export interface DownloadOptions {
  url: string
  filename?: string
  isModpack?: boolean
}

export interface DownloadResult {
  success: boolean
  message: string
  path?: string
  filename?: string
  isModpack?: boolean
}

export class DownloadService {
  constructor(private mainWindow: BrowserWindow) {}

  async downloadFile(options: DownloadOptions): Promise<DownloadResult> {
    try {
      const { url, isModpack } = options
      let { filename } = options

      if (!filename) {
        filename = path.basename(new URL(url).pathname)
      }

      const filePath = path.join(PATHS.downloads, filename)

      await download(this.mainWindow, url, {
        directory: PATHS.downloads,
        filename: filename,
        onProgress: (progress) => {
          this.mainWindow.webContents.send('download-progress', {
            percent: progress.percent,
            transferredBytes: progress.transferredBytes,
            totalBytes: progress.totalBytes
          })
        }
      })

      return {
        success: true,
        message: 'Downloaded successfully',
        path: filePath,
        filename,
        isModpack
      }
    } catch (error) {
      return {
        success: false,
        message: `Error downloading file: ${error.message}`
      }
    }
  }
}
