import { BrowserWindow } from 'electron'
import { MinecraftService } from './minecraft.service'
import { DownloadService } from './download.service'
import { FileSystemService } from './filesystem.service'
import { ExtractService } from './extract.service'

export interface Services {
  minecraft: MinecraftService
  download: DownloadService
  filesystem: FileSystemService
  extract: ExtractService
}

export function setupServices(mainWindow: BrowserWindow): Services {
  return {
    minecraft: new MinecraftService(mainWindow),
    download: new DownloadService(mainWindow),
    filesystem: new FileSystemService(),
    extract: new ExtractService()
  }
}
