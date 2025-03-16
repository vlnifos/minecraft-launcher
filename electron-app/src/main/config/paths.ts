import { app } from 'electron'
import * as path from 'path'
import * as fs from 'fs'

export const PATHS = {
  userData: app.getPath('userData'),
  instances: path.join(app.getPath('userData'), 'instances'),
  java: path.join(app.getPath('userData'), 'java'),
  downloads: path.join(app.getPath('userData'), 'downloads')
}

const checkAndCreateDir = (path: string): void => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
  }
}

export const ensureDirectories = (): void => {
  checkAndCreateDir(PATHS.instances)
  checkAndCreateDir(PATHS.java)
  checkAndCreateDir(PATHS.downloads)
}
