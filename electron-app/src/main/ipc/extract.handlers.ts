import { ipcMain } from 'electron'
import { ExtractService } from '../services/extract.service'

export function setupExtractHandlers(extractService: ExtractService): void {
  ipcMain.handle('extract-zip', async (_, options) => {
    return extractService.extractZip(options)
  })
}
