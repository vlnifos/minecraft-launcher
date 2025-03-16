import { BrowserWindow } from 'electron'
import { Client, ILauncherOptions } from 'minecraft-launcher-core'
import { PATHS } from '../config/paths'
import * as path from 'path'

export interface MinecraftOptions {
  username: string
  ram: number
  modpack: {
    folderName: string
    version: {
      number: string
      type: string
    }
  }
  javaPath: string
}

export class MinecraftService {
  constructor(private mainWindow: BrowserWindow) {}

  async launchGame(options: MinecraftOptions): Promise<void> {
    const launcher = new Client()

    const launchOptions: ILauncherOptions = {
      authorization: {
        access_token: 'offline',
        client_token: '123456',
        uuid: '00000000-0000-0000-0000-000000000000',
        name: options.username,
        user_properties: {
          'minecraft:user_type': 'mojang'
        }
      },
      root: path.join(PATHS.instances, options.modpack.folderName),
      javaPath: path.join(options.javaPath, 'bin', 'javaw.exe'),
      version: options.modpack.version,
      memory: {
        max: `${options.ram}M`,
        min: '512M'
      }
    }

    this.setupLauncherEvents(launcher)

    try {
      await launcher.launch(launchOptions)
      this.mainWindow.webContents.send('minecraft-status', { status: 'launched' })
    } catch (error: any) {
      this.mainWindow.webContents.send('minecraft-status', {
        status: 'error',
        message: error.message
      })
      throw error
    }
  }

  private setupLauncherEvents(launcher: Client): void {
    launcher.on('data', (data) => {
      const message = data.toString()
      this.mainWindow.webContents.send('minecraft-log', { message })
    })

    launcher.on('error', (err) => {
      this.mainWindow.webContents.send('minecraft-status', {
        status: 'error',
        message: err.message
      })
    })
  }
}
