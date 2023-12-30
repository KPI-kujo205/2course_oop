import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { readFileSync } from 'fs'
// Custom APIs for renderer
const api = {
  readConfig: () => {
    const pathToConfiig = '/home/kujo205/kpi/2course_oop/src/config.json'
    return JSON.parse(readFileSync(pathToConfiig).toString())
  }
} as const

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

export type MyApi = typeof api
