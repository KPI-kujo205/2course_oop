//@ts-ignore
import { Point } from '../../types'
import Chart from 'chart.js/auto'


class Object3 {
  points:Point[] = []
  ctx: CanvasRenderingContext2D
  chart: Chart|undefined

  constructor() {
    const canvas = document.querySelector('#chart') as HTMLCanvasElement
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    window.electron.ipcRenderer.on('clipboard-change', (_, clipboardValue) =>
      this.handleClipboardChange(clipboardValue)
    )

  }

  private handleClipboardChange(clipBoardValue:string){
    try {
      this.points = JSON.parse(clipBoardValue) ?? []
      this.initializeChart()
    }catch (e) {
      console.error(e)
    }
  }

  private initializeChart() {

    if(this.chart){
      this.chart.destroy()
    }

    // @ts-ignore
    this.chart=new Chart('chart', {
      type:'line',
      data:{
        labels: this.points.map(point => point.x),
        datasets:[{
          data: this.points.map(point => point.y),
          borderColor: "yellow",
          fill: false,
          label:'Графік прямої',
        }]
      },
      options:{
        plugins: {
          legend:{
            display:false
          },
        }
      }
    })

  }
}

export default new Object3()
