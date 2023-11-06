export default abstract class Shape{
    public x0:number;
    public y0:number;
    public offsetX: number;
    public offsetY:number;

    protected constructor(event:MouseEvent, ctx:CanvasRenderingContext2D, protected fillColor:string,protected outlineColor:string) {
        this.offsetX=ctx.canvas.offsetLeft;
        this.offsetY=ctx.canvas.offsetTop
        this.x0=event.x-this.offsetX;
        this.y0=event.y-this.offsetY;

    }
    abstract changePosition(event:MouseEvent):void;
    abstract paintOutline(ctx:CanvasRenderingContext2D):void;
    abstract paint(ctx:CanvasRenderingContext2D):void;
}
