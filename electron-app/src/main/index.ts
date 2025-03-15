import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as path from 'path'
import { Client, ILauncherOptions } from 'minecraft-launcher-core'
import * as fs from 'fs'

import { download } from 'electron-dl'

import { installExtension, REDUX_DEVTOOLS } from 'electron-devtools-installer'
import AdmZip from 'adm-zip'

const checkAndCreateDir = (path: string): void => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true })
  }
}

const downloadsPath = path.join(app.getPath('userData'), 'downloads')
checkAndCreateDir(downloadsPath)

const instancesPath = path.join(app.getPath('userData'), 'instances')
checkAndCreateDir(instancesPath)

const javaPath = path.join(app.getPath('userData'), 'java')
checkAndCreateDir(javaPath)

let mainWindow: BrowserWindow

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
    .then((ext) => console.log(`Added Extension:  ${ext.name}`))
    .catch((err) => console.log('An error occurred: ', err))
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('start-minecraft', async (event, { username, ram, modpack, javaPath }) => {
    const launcher = new Client()

    console.log('__dirname modpack', modpack)

    const options = {
      authorization: {
        access_token: 'offline',
        client_token: '123456',
        uuid: '00000000-0000-0000-0000-000000000000',
        name: username
      },
      root: path.join(instancesPath, modpack.folderName),
      javaPath: path.join(javaPath, 'bin', 'javaw.exe'),
      version: modpack.version,
      memory: {
        max: `${ram}M`,
        min: '512M'
      }
    }

    console.log('options123123', options)

    try {
      const launch = await launcher.launch(options as ILauncherOptions)
      console.log('launch', launch)
    } catch (error) {
      console.error(error)
    }

    launcher.on('data', (data) => {
      console.log(data.toString())
    })

    launcher.on('error', (err) => {
      console.error(err)
    })
  })

  ipcMain.handle('download-file', async (event, { url, filename, isModpack }) => {
    try {
      if (!filename) {
        filename = path.basename(new URL(url).pathname)
      }

      const filePath = path.join(downloadsPath, filename)

      await download(mainWindow, url, {
        directory: downloadsPath,
        filename: filename,
        onProgress: (progress) => {
          mainWindow.webContents.send('download-progress', {
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
  })

  ipcMain.handle('extract-zip', async (event, { zipPath, filename, isModpack }) => {
    try {
      const extractDir = isModpack ? instancesPath : path.join(javaPath)

      console.log('extractDir', extractDir, zipPath, filename)

      const zip = new AdmZip(zipPath)
      await zip.extractAllToAsync(extractDir, true)

      return {
        success: true,
        message: 'File successfully extracted',
        extractedTo: extractDir
      }
    } catch (error) {
      console.error('Error extracting file:', error)
      return {
        success: false,
        message: `Error extracting file: ${error.message}`
      }
    }
  })

  ipcMain.handle('get-downloads-path', () => {
    return downloadsPath
  })

  ipcMain.handle('get-downloaded-files', () => {
    try {
      const files = fs.readdirSync(downloadsPath)
      return files.map((file) => ({
        name: file,
        path: path.join(downloadsPath, file)
      }))
    } catch (error) {
      return {
        success: false,
        message: `Error getting list of files: ${error.message}`
      }
    }
  })

  ipcMain.handle('get-directories', () => {
    try {
      const allItems = fs.readdirSync(instancesPath)
      const directories = allItems.filter((item) => {
        const itemPath = path.join(instancesPath, item)
        return fs.statSync(itemPath).isDirectory()
      })

      return directories.map((dir) => ({
        name: dir,
        path: path.join(instancesPath, dir)
      }))
    } catch (error) {
      return {
        success: false,
        message: `Error getting list of directories: ${error.message}`
      }
    }
  })

  ipcMain.handle('get-java-directory', () => {
    try {
      const allItems = fs.readdirSync(javaPath)
      const directories = allItems.filter((item) => {
        const itemPath = path.join(javaPath, item)
        return fs.statSync(itemPath).isDirectory()
      })

      return directories.map((dir) => ({
        name: dir,
        path: path.join(javaPath, dir)
      }))
    } catch (error) {
      return {
        success: false,
        message: `Error getting list of directories: ${error.message}`
      }
    }
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
