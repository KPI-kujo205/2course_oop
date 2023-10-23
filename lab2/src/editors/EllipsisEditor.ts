import Elipsis from "./../shapes/Elipsis.ts";
import ShapeEditor from "./ShapeEditor.ts";
class EllipsisEditor implements ShapeEditor{
    private startedPaint:boolean;
    private elipsis:Elipsis;

    constructor(private ctx:CanvasRenderingContext2D) {
        this.ctx= ctx;
        this.startedPaint=false;
        this.elipsis=new Elipsis(0,0,ctx.canvas.offsetLeft,ctx.canvas.offsetTop);
    }

    onPaintStart(event:MouseEvent) {
        this.startedPaint=true;
        this.elipsis=new Elipsis(event.x,event.y,this.ctx.canvas.offsetLeft,this.ctx.canvas.offsetTop);
    }

    onMouseMove(event:MouseEvent) {
        if(!this.startedPaint)return;
        this.elipsis.changePosition(event);
        this.elipsis.paintOutline(this.ctx);
    }

    onPaintEnd(event:MouseEvent) {
        this.startedPaint=false;
        this.elipsis.changePosition(event);
        return this.elipsis;
    }

    paint() {
        this.elipsis.paint(this.ctx)
    }


}

export default EllipsisEditor;
