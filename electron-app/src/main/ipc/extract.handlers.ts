import { ipcMain } from 'electron'
import { ExtractService } from '../services/extract.service'

export function setupExtractHandlers(extractService: ExtractService): void {
  ipcMain.handle('extract-zip', async (event, options) => {
    return extractService.extractZip(options)
  })
}
