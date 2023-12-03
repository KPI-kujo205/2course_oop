import Shape from './shapes/Shape'
class MyTable {
  private tableBody: HTMLTableElement

  constructor() {
    this.tableBody = document.getElementById('table-body') as HTMLTableElement
    window.electron.ipcRenderer.on('render-shapes-table', this.renderShapes)
  }

  renderShapes(event: any, shapes: Shape[]) {
    this.tableBody.innerHTML = ''
    shapes.forEach((shape, i) => {
      this.tableBody.innerHTML = `<tr>
        <td>${i + 1}</td>
        <td>${shape.toolbarTitle}</td>
        <td>${shape.x0}</td>
        <td>${shape.y0}</td>
      </tr>`
    })
  }
}

export default new MyTable()
