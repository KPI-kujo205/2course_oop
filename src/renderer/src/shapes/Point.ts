import Shape from './Shape.d'
export default class Point extends Shape {
  constructor(
    event: MouseEvent,
    ctx: CanvasRenderingContext2D,
    fillColor: string,
    outlineColor: string
  ) {
    super(event, ctx, fillColor, outlineColor, 'Точка')
  }
  changePosition(event: MouseEvent) {
    this.x0 = event.clientX - this.offsetX
    this.y0 = event.clientY - this.offsetY
  }

  paintOutline(ctx: CanvasRenderingContext2D) {
    this.paint(ctx)
  }

  paint(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.fillColor
    ctx.strokeStyle = this.outlineColor
    ctx.fillRect(this.x0, this.y0, 3, 3)
  }

  getInstance(
    event: MouseEvent,
    ctx: CanvasRenderingContext2D,
    fillColor: string,
    outlineColor: string
  ) {
    return new Point(event, ctx, fillColor, outlineColor)
  }
}
