import Shape from "./Shape";
export default class Ellipsis extends Shape{
    private radiusX:number;
    private radiusY:number;

    constructor(x0:number,y0:number,offsetX:number, offsetY:number){
        super(x0-offsetX,y0-offsetY,offsetX,offsetX);
        this.radiusX=0;
        this.radiusY=0;
    }
    changeRadius(event:MouseEvent){
        this.radiusX=Math.abs(event.clientX-this.offsetX-this.x0)
        this.radiusY=Math.abs(event.clientY-this.offsetY-this.y0)
    }

    paint(ctx:CanvasRenderingContext2D){
        const originalFillStyle=ctx.fillStyle;
        ctx.fillStyle="rgb(68,225,79)";
        ctx.beginPath();
        ctx.ellipse(this.x0,this.y0,this.radiusX,this.radiusY,0,0,2*Math.PI);
        ctx.fill();
        ctx.fillStyle=originalFillStyle;
    }

    paintOutline(ctx:CanvasRenderingContext2D){
        ctx.beginPath();
        ctx.ellipse(this.x0,this.y0,this.radiusX,this.radiusY,0,0,2*Math.PI);
        ctx.stroke();
    }

}
