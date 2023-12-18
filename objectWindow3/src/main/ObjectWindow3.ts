import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import ClipboardListener from 'clipboard-listener'



const defaultProps: BrowserWindowConstructorOptions = {
  width: 400,
  height: 370,
  show: false,
  x: 1000,
  y: 0,
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
class ObjectWindow3 extends BrowserWindow {
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

    const listener = new ClipboardListener({
      timeInterval: 100,
      immediate: true,
    });
    [{"x":1,"y":2}]
    listener.on('change', clipboardValue => {
      console.log('clipboardValue',clipboardValue)
      this.webContents.send('clipboard-change', clipboardValue)
    });

  }
}

export default ObjectWindow3
