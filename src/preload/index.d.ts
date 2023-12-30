import { ElectronAPI } from '@electron-toolkit/preload'
import { MyApi } from './index'

declare global {
  interface Window {
    electron: ElectronAPI
    api: MyApi
  }
}
