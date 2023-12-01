import Shape from './Shape.d'
export default class Ellipsis extends Shape {
  public radiusX: number
  public radiusY: number

  constructor(
    event: MouseEvent,
    ctx: CanvasRenderingContext2D,
    fillColor: string,
    outlineColor: string
  ) {
    super(event, ctx, fillColor, outlineColor, 'Еліпс')
    this.radiusX = 0
    this.radiusY = 0
  }

  changePosition(event: MouseEvent) {
    this.radiusX = Math.abs(event.clientX - this.offsetX - this.x0)
    this.radiusY = Math.abs(event.clientY - this.offsetY - this.y0)
  }

  paint(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.fillColor
    ctx.strokeStyle = this.outlineColor

    ctx.beginPath()
    ctx.ellipse(this.x0, this.y0, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }

  paintOutline(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.fillColor
    ctx.strokeStyle = this.outlineColor
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.ellipse(this.x0, this.y0, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.setLineDash([0])
  }

  getInstance(
    event: MouseEvent,
    ctx: CanvasRenderingContext2D,
    fillColor: string,
    outlineColor: string
  ) {
    return new Ellipsis(event, ctx, fillColor, outlineColor)
  }
}
