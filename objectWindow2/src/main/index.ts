import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import ObjectWindow2 from './ObjectWindow2'
import {join} from "path";


function main(): void {

  new ObjectWindow2({file:join(__dirname,'../renderer/index.html')})


  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
}

app.whenReady().then(main)

app.on('window-all-closed', () => {
  app.quit()
})
