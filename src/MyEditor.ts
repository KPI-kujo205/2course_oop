import Shape from "./shapes/Shape.ts";
import Line from "./shapes/Line.ts";
import Point from "./shapes/Point.ts";
import Ellipsis from "./shapes/Elipsis.ts";
import Rectangle from "./shapes/Rectangle.ts";
import Cube from "./shapes/Cube.ts";
import LineOO from "./shapes/LineOO.ts";
enum ShapeType{
    Rectangle,
    Ellipsis,
    Line,
    Point,
    Cube,
    LineOO
}

const TitleMapper:Record<ShapeType, string> = {
    [ShapeType.Rectangle]:'Прямокутник',
    [ShapeType.Ellipsis]:'Еліпс',
    [ShapeType.Line]:'Лінія',
    [ShapeType.Point]:'Крапка',
    [ShapeType.Cube]:'Куб',
    [ShapeType.LineOO]:'Гантеля'
}

class MyEditor{
    private canvas:HTMLCanvasElement;
    private ctx:CanvasRenderingContext2D;
    private toolbarButtons!:HTMLInputElement[];
    private selectedShape: ShapeType = ShapeType.Rectangle;
    private currentShape: Shape | undefined;
    private isPainting:boolean=false;
    private fillColor:string='#000000';
    private outlineColor:string='#64ff00';

    constructor(public shapes:Shape[]=[]) {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.canvas.addEventListener('mousedown',(event)=> {
            this.startShapePaint(event)
        })

        this.canvas.addEventListener('mousemove', (e)=>{
            this.paintShape(e)
        })
        this.canvas.addEventListener('mouseup',(e)=> {
           this.endShapePaint(e)
        })
        this.configureToolbar()
        this.configureAdditionalTools();

    }

    private startShapePaint(event:MouseEvent  ){
        this.isPainting=true;
        switch (this.selectedShape){
            case ShapeType.Rectangle:
                this.currentShape=new Rectangle(event, this.ctx,this.fillColor,this.outlineColor);
                break;
            case ShapeType.Ellipsis:
                this.currentShape=new Ellipsis(event, this.ctx,this.fillColor,this.outlineColor);
                break;
            case ShapeType.Line:
                this.currentShape=new Line(event, this.ctx,this.fillColor,this.outlineColor);
                break;
            case ShapeType.Point:
                this.currentShape=new Point(event, this.ctx,this.fillColor,this.outlineColor);
                break;
            case ShapeType.Cube:
                this.currentShape=new Cube(event, this.ctx,this.fillColor,this.outlineColor);
                break;
            case ShapeType.LineOO:
                this.currentShape=new LineOO(event, this.ctx,this.fillColor,this.outlineColor);
                break;
        }
    };
    private paintShape(_:MouseEvent) {
        if(!this.isPainting) return;
        this.canvas.classList.add('painting')
        this.repaintShapes();
        this.currentShape?.changePosition(_);
        this.currentShape?.paintOutline(this.ctx);
    };
    private endShapePaint(_:MouseEvent){
        if(this.currentShape===undefined)return
        this.isPainting=false;
        this.shapes.push(this.currentShape as Shape)
        this.canvas.classList.remove('painting')
        this.repaintShapes()

    }
    private repaintShapes(){
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
        for (const shape of this.shapes) {
            shape.paint(this.ctx);
        }
    }
    private configureToolbar(){
        this.toolbarButtons=['#ellipsis-btn','#line-btn','#rectangle-btn','#point-btn','#cube-btn','#lineOO-btn'].map((btn)=>document.querySelector(btn) as HTMLInputElement);
         for(const button of this.toolbarButtons){
            button.addEventListener('click',this.setActiveShapeButton.bind(this))
        }
    }
    private configureAdditionalTools(){
        const cleanButton=document.querySelector('#clean-btn') as HTMLButtonElement;
        const backButton=document.querySelector('#back-btn') as HTMLButtonElement;
        const fillColorInput=document.querySelector('#fill-color') as HTMLInputElement;
        const outlineColorInput=document.querySelector('#outline-color') as HTMLInputElement;


        cleanButton.addEventListener('click',()=>{
            this.shapes=[];
            this.repaintShapes()
        })

        backButton.addEventListener('click',()=>{
            this.shapes.pop();
            this.repaintShapes()
        })

        fillColorInput.addEventListener('change',()=>{
            this.fillColor=fillColorInput.value;
        })

        outlineColorInput.addEventListener('change',()=>{
            this.outlineColor=outlineColorInput.value;
        })

    }
    private setActiveShapeButton(event:MouseEvent){
        const targetedButton=event.target as HTMLInputElement;
        this.toolbarButtons.forEach(b=>b.classList.remove('selected'))
        targetedButton.classList.add('selected')

        this.selectedShape= +targetedButton.value;

        const title=document.querySelector('title') as HTMLTitleElement;
        title.innerText=TitleMapper[this.selectedShape];
    }
}
export default MyEditor;
