export default abstract class Shape{
    constructor(protected x0:number,protected y0:number,protected offsetX:number,protected offsetY:number) {}
    abstract paint(ctx:CanvasRenderingContext2D):void;
}
