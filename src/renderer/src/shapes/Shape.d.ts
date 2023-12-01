export default abstract class Shape {
  public x0: number
  public y0: number
  public offsetX: number
  public offsetY: number
  public toolbarTitle: string
  public initialEvent: MouseEvent

  protected constructor(
    event: MouseEvent,
    ctx: CanvasRenderingContext2D,
    protected fillColor: string,
    protected outlineColor: string,
    title: string
  ) {
    this.initialEvent = event
    this.offsetX = ctx.canvas.offsetLeft
    this.offsetY = ctx.canvas.offsetTop
    this.x0 = event.x - this.offsetX
    this.y0 = event.y - this.offsetY
    this.toolbarTitle = title
  }
  abstract getInstance(
    event: MouseEvent,
    ctx: CanvasRenderingContext2D,
    fillColor: string,
    outlineColor: string
  ): Shape
  abstract changePosition(event: MouseEvent): void
  abstract paintOutline(ctx: CanvasRenderingContext2D): void
  abstract paint(ctx: CanvasRenderingContext2D): void
}
