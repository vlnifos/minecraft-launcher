import * as fs from 'fs'
import * as path from 'path'
import { PATHS } from '../config/paths'

export interface FileInfo {
  name: string
  path: string
}

export class FileSystemService {
  constructor() {
    console.log('FileSystemService constructor')
  }

  getDownloadsPath(): string {
    return PATHS.downloads
  }

  getDownloadedFiles(): FileInfo[] {
    try {
      const files = fs.readdirSync(PATHS.downloads)

      return files.map((file) => ({
        name: file,
        path: path.join(PATHS.downloads, file)
      }))
    } catch {
      return []
    }
  }

  getDirectories(): FileInfo[] {
    try {
      const allItems = fs.readdirSync(PATHS.instances)
      const directories = allItems.filter((item) => {
        const itemPath = path.join(PATHS.instances, item)
        return fs.statSync(itemPath).isDirectory()
      })

      return directories.map((dir) => ({
        name: dir,
        path: path.join(PATHS.instances, dir)
      }))
    } catch {
      return []
    }
  }

  getJavaDirectory(): FileInfo[] {
    try {
      const allItems = fs.readdirSync(PATHS.java)
      const directories = allItems.filter((item) => {
        const itemPath = path.join(PATHS.java, item)
        return fs.statSync(itemPath).isDirectory()
      })

      return directories.map((dir) => ({
        name: dir,
        path: path.join(PATHS.java, dir)
      }))
    } catch {
      return []
    }
  }
}
