import Rectangle from "./../shapes/Rectangle.ts";
import ShapeEditor from "./ShapeEditor.ts";
class RectangleEditor implements ShapeEditor{
    private startedPaint:boolean;
    private rect:Rectangle;

    constructor(private ctx:CanvasRenderingContext2D) {
        this.ctx= ctx;
        this.startedPaint=false;
        this.rect=new Rectangle(0,0,0,0);
    }
    onPaintStart(event:MouseEvent) {
        this.startedPaint=true;
        this.rect=new Rectangle(event.x,event.y,this.ctx.canvas.offsetLeft,this.ctx.canvas.offsetTop);
    }
    onMouseMove(event:MouseEvent) {
        if(!this.startedPaint)return;
        this.rect.changePosition(event);
        this.rect.paintOutline(this.ctx)

    }
    onPaintEnd(event:MouseEvent) {
        this.startedPaint=false;
        this.rect.changePosition(event);
        return this.rect;
    }
    paint() {
        this.rect.paint(this.ctx)
    }
}

export default RectangleEditor;
