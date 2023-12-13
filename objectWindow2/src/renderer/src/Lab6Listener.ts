// @ts-ignore
const ipc=window.nodeIpc
import type {Lab6FormData} from '../../types'

type Subscriber=(data: Lab6FormData) => void

class Lab6Listener {
  subscribers:Subscriber[] = []

  constructor() {
    ipc.connectTo('lab6', () => {
      ipc.of.lab6.on('connect', () => {
        console.log('connected to lab6')
      })
      
    })

  }

  public subscribe(subscriber:Subscriber) {
    this.subscribers.push(subscriber)
  }

  public handleExecuteButtonClicked(data: Lab6FormData) {
    this.subscribers.forEach(subscriber => subscriber(data))
  }
}
export default Lab6Listener
