import { BrowserWindow } from 'electron'
import { setupMinecraftHandlers } from './minecraft.handlers'
import { Services } from '../services'
import { setupFilesystemHandlers } from './filesystem.handlers'
import { setupExtractHandlers } from './extract.handlers'
import { setupDownloadHandlers } from './download.handlers'

export function setupIpcHandlers(mainWindow: BrowserWindow, services: Services): void {
  setupMinecraftHandlers(services.minecraft)
  setupFilesystemHandlers(services.filesystem)
  setupExtractHandlers(services.extract)
  setupDownloadHandlers(mainWindow, services.download)
}
