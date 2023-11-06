import Shape from "./Shape";
export default class Rectangle extends Shape{
    public x:number;
    public y:number;

    constructor(event:MouseEvent, ctx:CanvasRenderingContext2D,fillColor:string, outlineColor:string){
        super(event,ctx,fillColor,outlineColor);
        this.x=this.x0;
        this.y=this.y0;

    }
    changePosition(event:MouseEvent){
        this.x=event.clientX-this.offsetX;
        this.y=event.clientY-this.offsetY;
    }

    paint(ctx:CanvasRenderingContext2D){
        ctx.fillStyle=this.fillColor;
        ctx.strokeStyle=this.outlineColor;

        ctx.strokeRect(this.x0,this.y0,this.x-this.x0,this.y-this.y0);
        ctx.fillRect(this.x0,this.y0,this.x-this.x0,this.y-this.y0);
    }

    paintOutline(ctx:CanvasRenderingContext2D){
        ctx.setLineDash([5,5])
        ctx.fillStyle=this.fillColor;
        ctx.strokeStyle=this.outlineColor;

        ctx.strokeRect(this.x0,this.y0,this.x-this.x0,this.y-this.y0);
        ctx.setLineDash([0,0])
    }

}
