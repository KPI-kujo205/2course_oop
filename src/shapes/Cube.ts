import Shape from "./Shape.ts";
import Rectangle from "./Rectangle.ts";
import Line from "./Line.ts";

const horizontalOffset=(line:number)=>line*.5
const verticalOffset=(line:number)=>line*.33


export default class Cube extends Shape{
    private frontRectangle:Rectangle;
    private backRectangle:Rectangle;
    private topLeftLine:Line;
    private topRightLine:Line;
    private bottomLeftLine:Line;
    private bottomRightLine:Line;


    constructor(event:MouseEvent, ctx:CanvasRenderingContext2D,fillColor:string, outlineColor:string){
        super(event,ctx,fillColor,outlineColor);
        this.frontRectangle=new Rectangle(event,ctx,'rgba(0,0,0,0)',outlineColor);
        this.backRectangle=new Rectangle(event,ctx,'rgba(0,0,0,0)',outlineColor);
        this.topLeftLine=new Line(event,ctx,'rgba(0,0,0,0)',outlineColor);
        this.topRightLine=new Line(event,ctx,'rgba(0,0,0,0)',outlineColor);
        this.bottomLeftLine=new Line(event,ctx,'rgba(0,0,0,0)',outlineColor);
        this.bottomRightLine=new Line(event,ctx,'rgba(0,0,0,0)',outlineColor);
    }

    changePosition(event: MouseEvent) {
        const newX= event.clientX - this.offsetX;
        const newY= event.clientY - this.offsetY;

        const dx=newX-this.x0;
        const cubeWidth=dx*3;

        const cubeHeight=newY-this.y0;
        const dy=cubeHeight/4;

        this.frontRectangle.x0=this.backRectangle.x0-dx
        this.frontRectangle.x=newX
        this.backRectangle.x=newX+dx

        this.frontRectangle.y0=this.backRectangle.y0+dy
        this.frontRectangle.y=newY
        this.backRectangle.y=newY-dy

        this.topLeftLine.x=this.frontRectangle.x0
        this.topLeftLine.y=this.frontRectangle.y0

        this.topRightLine.x0=this.backRectangle.x0+dx*2
        this.topRightLine.y0=this.backRectangle.y0

        this.topRightLine.x=this.frontRectangle.x
        this.topRightLine.y=this.frontRectangle.y-3*dy

        this.bottomLeftLine.y0=this.backRectangle.y0+dy*3
        this.bottomLeftLine.y=this.frontRectangle.y0+dy*3
        this.bottomLeftLine.x=this.frontRectangle.x0

        this.bottomRightLine.x0=this.backRectangle.x
        this.bottomRightLine.x=this.frontRectangle.x
        this.bottomRightLine.y0=this.backRectangle.y
        this.bottomRightLine.y=this.frontRectangle.y
    }

    paint(ctx: CanvasRenderingContext2D) {
        this.frontRectangle.paint(ctx)
        this.backRectangle.paint(ctx)
        this.topLeftLine.paint(ctx)
        this.topRightLine.paint(ctx)
        this.bottomLeftLine.paint(ctx)
        this.bottomRightLine.paint(ctx)
    }

    paintOutline(ctx: CanvasRenderingContext2D) {
        ctx.setLineDash([5,5])
        this.frontRectangle.paintOutline(ctx)
        this.backRectangle.paintOutline(ctx)
        this.topLeftLine.paintOutline(ctx)
        this.topRightLine.paintOutline(ctx)
        this.bottomLeftLine.paintOutline(ctx)
        this.bottomRightLine.paintOutline(ctx)
        ctx.setLineDash([0])

    }


}

