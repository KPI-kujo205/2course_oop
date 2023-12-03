import { app, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import Lab5 from './Lab5'
function main(): void {
  const lab5 = new Lab5()

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
}

app.whenReady().then(main)

app.on('window-all-closed', () => {
  app.quit()
})
