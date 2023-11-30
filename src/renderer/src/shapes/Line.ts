import Shape from './Shape'
export default class Line extends Shape {
  public x: number
  public y: number

  constructor(
    event: MouseEvent,
    ctx: CanvasRenderingContext2D,
    fillColor: string,
    outlineColor: string
  ) {
    super(event, ctx, fillColor, outlineColor, 'Лінія')
    this.x = this.x0
    this.y = this.y0
  }
  changePosition(event: MouseEvent) {
    this.x = event.clientX - this.offsetX
    this.y = event.clientY - this.offsetY
  }
  paintOutline(ctx: CanvasRenderingContext2D) {
    ctx.setLineDash([5, 5])

    ctx.beginPath()

    ctx.fillStyle = this.fillColor
    ctx.strokeStyle = this.outlineColor

    ctx.moveTo(this.x0, this.y0)
    ctx.lineTo(this.x, this.y)
    ctx.stroke()
    ctx.setLineDash([0])
  }

  paint(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.fillStyle = this.fillColor
    ctx.strokeStyle = this.outlineColor

    ctx.moveTo(this.x0, this.y0)
    ctx.lineTo(this.x, this.y)
    ctx.stroke()
  }

  getInstance(
    event: MouseEvent,
    ctx: CanvasRenderingContext2D,
    fillColor: string,
    outlineColor: string
  ) {
    return new Line(event, ctx, fillColor, outlineColor)
  }
}
