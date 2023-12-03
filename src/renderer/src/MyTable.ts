import Shape from './shapes/Shape'
import type { IpcRendererEvent } from 'electron'
class MyTable {
  private tableBody: HTMLTableElement

  constructor() {
    this.tableBody = document.querySelector('.table-body') as HTMLTableElement
    window.electron.ipcRenderer.on('render-shapes-table', this.renderShapes.bind(this))
  }

  renderShapes(_: IpcRendererEvent, shapes: Shape[]) {
    this.tableBody.innerHTML = ''
    shapes.forEach((shape, i) => {
      this.tableBody.innerHTML += `<tr data-id='${shape.id}'>
        <td>${i + 1}</td>
        <td>${shape.toolbarTitle}</td>
        <td>(${shape.x0}, ${shape.y0})</td>
        <td style='background-color:${shape.fillColor}'>${shape.fillColor}</td>
        <td style='background-color:${shape.outlineColor}'>${shape.outlineColor}</td>
        <td><button class='delete-btn' data-id='${shape.id}'></button></td>
      </tr>`
    })

    const rows = this.tableBody.querySelectorAll('tr')
    for (const row of rows) {
      if (!row.dataset.id) continue
      const shapeId = +row.dataset.id
      const deleteBtn = row.querySelector('.delete-btn') as HTMLButtonElement
      deleteBtn.addEventListener('click', () => {
        this.emitDeleteShapeEvent(shapeId)
      })
    }
  }

  emitDeleteShapeEvent(id: number) {
    window.electron.ipcRenderer.send('delete-shape-event', id)
  }
}

export default new MyTable()
