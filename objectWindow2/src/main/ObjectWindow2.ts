import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

const defaultProps: BrowserWindowConstructorOptions = {
  width: 900,
  height: 670,
  show: false,
  autoHideMenuBar: true,
  webPreferences: {
    nodeIntegration:true,
    devTools: true,
    sandbox: false,
    preload: join(__dirname, '../preload/index.js'),
    webSecurity: false,
  }
}

export interface WindowConstructorParams extends BrowserWindowConstructorOptions {
  file: string
}
class ObjectWindow2 extends BrowserWindow {
  constructor({ file, ...windowSettings }: WindowConstructorParams) {
    super({ ...defaultProps, ...windowSettings })

    this.once('ready-to-show', () => {
      this.show()
    })
    const fileNameWithoutDir = file.split('/').at(-1)

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.loadURL(process.env['ELECTRON_RENDERER_URL'] + '/' + fileNameWithoutDir)
    } else {
      this.loadFile(file)
    }
  }
}

export default ObjectWindow2
