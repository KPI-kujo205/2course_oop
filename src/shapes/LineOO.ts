import Shape from "./Shape.ts";
import Ellipsis from "./Elipsis.ts";
import Line from "./Line.ts";
export default class LineOO extends Shape{
    protected leftEllipsis:Ellipsis;
    protected rightEllipsis:Ellipsis;
    protected line:Line;
    constructor(event:MouseEvent, ctx:CanvasRenderingContext2D,fillColor:string, outlineColor:string,) {
        super(event,ctx,fillColor,outlineColor,'Гантеля');
        this.leftEllipsis=new Ellipsis(event,ctx,fillColor,outlineColor);
        this.rightEllipsis=new Ellipsis(event,ctx,fillColor,outlineColor);
        this.leftEllipsis.radiusX=10;
        this.leftEllipsis.radiusY=10;
        this.rightEllipsis.radiusX=10;
        this.rightEllipsis.radiusY=10;
        this.line=new Line(event,ctx,fillColor,outlineColor);
    }

    changePosition(event: MouseEvent) {
        this.line.changePosition(event);
        this.leftEllipsis.x0=event.clientX-this.offsetX;
        this.leftEllipsis.y0=event.clientY-this.offsetY;
    }

    paintOutline(ctx: CanvasRenderingContext2D) {
        this.line.paintOutline(ctx);
        this.leftEllipsis.paintOutline(ctx);
        this.rightEllipsis.paintOutline(ctx);
    }

    paint(ctx: CanvasRenderingContext2D) {
        this.line.paint(ctx);
        this.leftEllipsis.paint(ctx);
        this.rightEllipsis.paint(ctx);
    }

    getInstance(event:MouseEvent, ctx:CanvasRenderingContext2D, fillColor:string, outlineColor:string){
        return new LineOO(event,ctx,fillColor,outlineColor);
    };


}
