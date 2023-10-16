import Shape from "./Shape";
export default class Point extends Shape{
    constructor(x0:number,y0:number,offsetX:number,offsetY:number){
        super(x0-offsetX,y0-offsetY,offsetX,offsetY);
    }
    changePosition(event:MouseEvent){
        this.x0=event.clientX-this.offsetX;
        this.y0=event.clientY-this.offsetY;
    }

    paint(ctx:CanvasRenderingContext2D){
        ctx.fillRect(this.x0,this.y0,3,3);
    }

}
