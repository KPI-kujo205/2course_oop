import ShapeEditor from "./ShapeEditor.ts";
import Point from "../shapes/Point.ts";
class PointEditor implements ShapeEditor{
    private startedPaint:boolean;
    private point!:Point;

    constructor(private ctx:CanvasRenderingContext2D) {
        this.ctx= ctx;
        this.startedPaint=false;
    }
    onPaintStart(event:MouseEvent) {
        this.startedPaint=true;
        this.point=new Point(event.x,event.y,this.ctx.canvas.offsetLeft,this.ctx.canvas.offsetTop);
    }
    onMouseMove(event:MouseEvent) {
        if(!this.startedPaint)return;
        this.point.changePosition(event);
        this.point.paint(this.ctx)

    }
    onPaintEnd(event:MouseEvent) {
        this.startedPaint=false;
        this.point.changePosition(event);
        return this.point;
    }
    paint() {
        this.point.paint(this.ctx)
    }
}

export default PointEditor;
