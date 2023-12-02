import Window, { WindowConstructorParams } from './Window'

class MyTableWindow extends Window {
  private static windowInstance: MyTableWindow | null = null
  private constructor(attributes: WindowConstructorParams) {
    super(attributes)
    this.on('close', (event) => {
      event.preventDefault()
      this.hide()
    })
  }
  public getInstance(attributes?: WindowConstructorParams) {
    if (!MyTableWindow.windowInstance) {
      if (!attributes) throw new Error('Initialize an instance with attributes first')
      MyTableWindow.windowInstance = new MyTableWindow(attributes)
    }
    return MyTableWindow.windowInstance
  }
}

export default MyTableWindow
