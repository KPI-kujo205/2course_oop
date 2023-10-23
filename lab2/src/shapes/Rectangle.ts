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
        const deltaX=this.x-this.x0;
        const deltaY=this.y-this.y0;

        ctx.strokeRect(this.x0-deltaX,this.y0-deltaY,2*deltaX,2*deltaY);
    }

    paintOutline(ctx:CanvasRenderingContext2D){
        const deltaX=this.x-this.x0;
        const deltaY=this.y-this.y0;


        const originalStrokeStyle=ctx.fillStyle;
        ctx.strokeStyle = "rgb(248,32,87)";
        ctx.strokeRect(this.x0-deltaX,this.y0-deltaY,2*deltaX,2*deltaY);

        ctx.strokeStyle=originalStrokeStyle;
    }

}
