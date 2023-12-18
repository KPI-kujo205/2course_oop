import { Lab6FormData,Point } from '../../types'
class Object2 {
  points:Point[] = []
  table: HTMLTableElement
  constructor() {
    this.table = document.querySelector('#table>tbody') as HTMLTableElement

    window.electron.ipcRenderer.on('logger',(_,data)=>{
      console.log(data)
    })

    window.electron.ipcRenderer.on('executeButtonClicked', (_, data: Lab6FormData) => {
      this.handleExecuteButtonClicked(data)
    })
  }

  public handleExecuteButtonClicked(data: Lab6FormData) {
    const newPoints:Point[] = []
    const xStep = (data.xMax - data.xMin) / data.nPoints
    const yStep = (data.xMax - data.xMin) / data.nPoints

    let xStart= data.xMin;
    let yStart= data.yMin;

    for (let i = 0; i < data.nPoints; i++) {
      const point:Point = {
        order: i+1,
        x: +xStart.toFixed(2),
        y: +yStart.toFixed(2)
      }
      newPoints.push(point)
      xStart+=xStep;
      yStart+=yStep;
    }
    this.points = newPoints
    this.copyPointsToClipboard()
    this.addRowsToTable()
  }

  private copyPointsToClipboard(){
    window.electron.ipcRenderer.send('copy-to-clipboard',JSON.stringify(this.points))
  }
  private addRowsToTable() {
    this.table.innerHTML = ''
    for (const point of this.points) {
      this.table.innerHTML += `<tr>
        <td>${point.order}</td>
        <td>${point.x}</td>
        <td>${point.y}</td>
        </tr>`
    }
  }

}

export default new Object2()
