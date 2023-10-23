import Shape from "./Shape";
export default class Ellipsis extends Shape{
    private x:number;
    private y:number;

    constructor(x0:number,y0:number,offsetX:number, offsetY:number){
        super(x0-offsetX,y0-offsetY,offsetX,offsetX);
        this.x=this.x0;
        this.y=this.y0;
    }
    changePosition(event:MouseEvent){
        this.x=event.clientX-this.offsetX
        this.y=event.clientY-this.offsetY
    }

    paint(ctx:CanvasRenderingContext2D){
        const originalFillStyle=ctx.fillStyle;
        const originalStrokeStyle=ctx.strokeStyle;

        ctx.fillStyle="rgb(238,225,45)";
        ctx.strokeStyle="rgb(0,0,0)"

        const centerX=(this.x+this.x0)/2
        const centerY=(this.y+this.y0)/2;
        const radiusX=Math.abs((this.x-this.x0)/2)
        const radiusY=Math.abs((this.y-this.y0)/2)

        ctx.beginPath();
        ctx.ellipse(centerX,centerY,radiusX,radiusY,0,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();


        ctx.fillStyle=originalFillStyle
        ctx.strokeStyle=originalStrokeStyle
    }

    paintOutline(ctx:CanvasRenderingContext2D){
        const originalStrokeStyle=ctx.fillStyle;

        const centerX=(this.x+this.x0)/2
        const centerY=(this.y+this.y0)/2;
        const radiusX=Math.abs((this.x-this.x0)/2)
        const radiusY=Math.abs((this.y-this.y0)/2)

        ctx.beginPath();
        ctx.ellipse(centerX,centerY,radiusX,radiusY,0,0,2*Math.PI);

        ctx.strokeStyle = "rgb(248,32,87)";
        ctx.stroke();
        ctx.strokeStyle=originalStrokeStyle;
    }

}
