import { app, ipcMain, shell } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import Window from './Window'
function main(): void {
  // Create the browser window.
  const mainWindow = new Window({
    file: join(__dirname, '../renderer/index.html')
  })
  let tableWindow
  ipcMain.on('add-shape-event', (event, arg) => {
    // Request to update the label in the renderer process of the second window
    console.log('someee event', arg)
  })

  ipcMain.on('toggle-table-window', (event, arg) => {
    console.log(tableWindow, 'tableWindow')
    if (tableWindow && tableWindow?.isVisible()) {
      tableWindow.hide()
      tableWindow = null
      return
    }

    tableWindow = new Window({
      file: join(__dirname, '../renderer/table.svg.html'),
      parent: mainWindow,
      backgroundMaterial: 'mica'
    })
    tableWindow.onclose(() => {
      tableWindow = null
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
