import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { join } from 'path'

const defaultProps: BrowserWindowConstructorOptions = {
  width: 900,
  height: 670,
  show: false,
  autoHideMenuBar: true,
  webPreferences: {
    // nodeIntegration: true,
    devTools: true,
    preload: join(__dirname, '../preload/index.js')
  }
}

interface WindowConstructorParams extends BrowserWindowConstructorOptions {
  file: string
}
class Window extends BrowserWindow {
  constructor({ file, ...windowSettings }: WindowConstructorParams) {
    console.log(join(__dirname, '../preload/index.js'))
    super({ ...defaultProps, ...windowSettings })

    this.loadFile(file)

    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

export default Window
