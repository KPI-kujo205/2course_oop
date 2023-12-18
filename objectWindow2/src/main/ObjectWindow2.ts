import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import type {Lab6FormData} from "../types";
import CringeIpc from 'node-ipc'
// @ts-ignore
const ipc = CringeIpc.default as typeof CringeIpc

const defaultProps: BrowserWindowConstructorOptions = {
  width: 400,
  height: 370,
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

    this.configureNodeIpc()

  }

  private configureNodeIpc(){
    ipc.connectTo('lab6', () => {
      ipc.of.lab6.on('connect', () => {
        this.webContents.send('logger', 'connected to lab6')
      })
    })

    ipc.of.lab6.on('executeButtonClicked', (data: Lab6FormData) => {
      this.webContents.send('executeButtonClicked', data)
    })

  }


}

export default ObjectWindow2
