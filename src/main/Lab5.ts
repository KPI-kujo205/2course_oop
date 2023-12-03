import Window from './Window'
import { join } from 'path'
import MyTableWindow from './MyTableWindow'
import { ipcMain } from 'electron'
export default class Lab5 {
  constructor() {
    const mainWindow = new Window({
      file: join(__dirname, '../renderer/index.html')
    })

    let tableWindow: MyTableWindow

    ipcMain.on('render-shapes-event', (_, shapes) => {
      if (!tableWindow) return
      tableWindow.webContents.send('render-shapes-table', shapes)
    })

    ipcMain.on('delete-shape-event', (_, shapeId) => {
      if (!tableWindow) return
      mainWindow.webContents.send('delete-shape-event', shapeId)
    })

    ipcMain.on('show-table-window', (_, shapes) => {
      tableWindow = MyTableWindow.prototype.getInstance({
        file: join(__dirname, '../renderer/table.html'),
        parent: mainWindow
      })
      tableWindow.webContents.send('render-shapes-table', shapes)
      tableWindow.show()
    })
  }
}
