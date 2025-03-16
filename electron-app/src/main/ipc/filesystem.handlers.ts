// electron-app/src/main/ipc/filesystem.handlers.ts
import { ipcMain } from 'electron'
import { FileSystemService } from '../services/filesystem.service'

export function setupFilesystemHandlers(filesystemService: FileSystemService): void {
  ipcMain.handle('get-downloads-path', () => {
    return filesystemService.getDownloadsPath()
  })

  ipcMain.handle('get-downloaded-files', () => {
    return filesystemService.getDownloadedFiles()
  })

  ipcMain.handle('get-directories', () => {
    return filesystemService.getDirectories()
  })

  ipcMain.handle('get-java-directory', () => {
    return filesystemService.getJavaDirectory()
  })
}
