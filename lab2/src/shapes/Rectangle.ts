import Shape from "./Shape";
export default class Rectangle extends Shape{
    private x:number;
    private y:number;

    constructor(x0:number,y0:number,offsetX:number,offsetY:number){
        super(x0-offsetX,y0-offsetY,offsetX,offsetY);
        this.x=this.x0;
        this.y=this.y0;

    }
    changePosition(event:MouseEvent){
        this.x=event.clientX-this.offsetX;
        this.y=event.clientY-this.offsetY;
    }

    paint(ctx:CanvasRenderingContext2D){
        const originalFillStyle=ctx.fillStyle;
        ctx.strokeRect(this.x0,this.y0,this.x-this.x0,this.y-this.y0);
        ctx.fillStyle = "rgb(248,235,58)";
        ctx.fillRect(this.x0,this.y0,this.x-this.x0,this.y-this.y0);
        ctx.fillStyle=originalFillStyle;
    }

    paintOutline(ctx:CanvasRenderingContext2D){
        ctx.strokeRect(this.x0,this.y0,this.x-this.x0,this.y-this.y0);
    }

}
