import { app, ipcMain, shell } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import Window from './Window'
import MyTableWindow from './MyTableWindow'
function main(): void {
  // Create the browser window.
  const mainWindow = new Window({
    file: join(__dirname, '../renderer/index.html')
  })

  ipcMain.on('show-table-window', (event, arg) => {
    const tableWindow = MyTableWindow.prototype.getInstance({
      file: join(__dirname, '../renderer/table.html')
    })
    tableWindow.show()

    ipcMain.on('render-shapes-event', (event, shapes) => {
      tableWindow.webContents.send('render-shapes-table', shapes)
    })
  })

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
}

// This method will be called when Electron has finished
// initialization asdand is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(main)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  app.quit()
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
