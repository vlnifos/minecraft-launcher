import { app, BrowserWindow } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { setupIpcHandlers } from './ipc/handlers'
import { createWindow } from './window/main-window'
import { setupServices } from './services'
import { ensureDirectories } from './config/paths'
import { installExtension, REDUX_DEVTOOLS } from 'electron-devtools-installer'

ensureDirectories()

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  setupDevTools()

  const mainWindow = createWindow()

  const services = setupServices(mainWindow)

  setupIpcHandlers(mainWindow, services)

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function setupDevTools(): void {
  if (process.env.NODE_ENV === 'development') {
    installExtension(REDUX_DEVTOOLS)
      .then((ext) => console.log(`Added Extension: ${ext.name}`))
      .catch((err) => console.error('Error installing extension:', err))
  }
}
