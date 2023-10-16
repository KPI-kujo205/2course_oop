import ShapeEditor from "./ShapeEditor.ts";
import Line from "../shapes/Line.ts";
class LineEditor implements ShapeEditor{
    private startedPaint:boolean;
    private line!:Line;

    constructor(private ctx:CanvasRenderingContext2D) {
        this.ctx= ctx;
        this.startedPaint=false;
    }
    onPaintStart(event:MouseEvent) {
        this.startedPaint=true;
        this.line=new Line(event.x,event.y,this.ctx.canvas.offsetLeft,this.ctx.canvas.offsetTop);
    }
    onMouseMove(event:MouseEvent) {
        if(!this.startedPaint)return;
        this.line.changePosition(event);
        this.line.paint(this.ctx)

    }
    onPaintEnd(event:MouseEvent) {
        this.startedPaint=false;
        this.line.changePosition(event);
        return this.line;
    }
    paint() {
        this.line.paint(this.ctx)
    }
}

export default LineEditor;
