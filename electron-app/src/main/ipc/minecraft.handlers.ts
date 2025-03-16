import { ipcMain } from 'electron'
import { MinecraftOptions, MinecraftService } from '../services/minecraft.service'

export function setupMinecraftHandlers(minecraftService: MinecraftService): void {
  ipcMain.on('start-minecraft', async (event, options: MinecraftOptions) => {
    try {
      await minecraftService.launchGame(options)
    } catch (error: any) {
      console.error('Error launching Minecraft:', error)
      event.reply('minecraft-status', {
        status: 'error',
        message: error.message
      })
    }
  })
}
