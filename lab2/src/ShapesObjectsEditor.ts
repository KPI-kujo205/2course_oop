import Shape from "./shapes/Shape.ts";
import EllipsisEditor from "./editors/EllipsisEditor.ts";
import ShapeEditor from "./editors/ShapeEditor.ts";
import RectangleEditor from "./editors/RectangleEditor.ts";
import LineEditor from "./editors/LineEditor.ts";
import PointEditor from "./editors/PointEditor.ts";

enum EditorType{
    RectangleEditor,
    EllipsisEditor,
    LineEditor,
    PointEditor
}

const HTMLInputElement:Record<EditorType, string> = {
    [EditorType.RectangleEditor]:'Прямокутник',
    [EditorType.EllipsisEditor]:'Еліпс',
    [EditorType.LineEditor]:'Лінія',
    [EditorType.PointEditor]:'Крапка'
}


class ShapesObjectEditor{
    private ctx:CanvasRenderingContext2D;
    private editor!:ShapeEditor;
    private toolbarButtons!:HTMLInputElement[];
    constructor(public shapes:Shape[]=[]) {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const menu= document.getElementById('objects_menu') as HTMLSelectElement;
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.configureEditor(+menu.value as EditorType)

        menu.addEventListener('change',(_)=> this.configureEditor(+menu.value as EditorType))
        canvas.addEventListener('mousedown',(e)=>this.editor.onPaintStart(e))
        canvas.addEventListener('mousemove', (e)=>{
            this.repaint();
            this.editor.onMouseMove(e)
        })
        canvas.addEventListener('mouseup',(e)=> {
            this.shapes.push(this.editor.onPaintEnd(e))
        })
        this.configureToolbar()
        this.configureAdditionalTools();

    }
    repaint(){
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
        for (const shape of this.shapes) {
            shape.paint(this.ctx);
        }
    }

    configureEditor(type:EditorType){
        switch (type) {
            case EditorType.RectangleEditor:
                this.editor = new RectangleEditor(this.ctx);
                break;
            case EditorType.EllipsisEditor:
                this.editor = new EllipsisEditor(this.ctx);
                break;
            case EditorType.LineEditor:
                this.editor = new LineEditor(this.ctx);
                break;
            case EditorType.PointEditor:
                this.editor = new PointEditor(this.ctx);
                break;
        }
        const title=document.querySelector('title') as HTMLTitleElement;
        title.innerText=HTMLInputElement[type];
    }

    configureToolbar(){
        this.toolbarButtons=['#ellipsis-btn','#line-btn','#rectangle-btn','#point-btn'].map((btn)=>document.querySelector(btn) as HTMLInputElement);

        //for styling
         for(const button of this.toolbarButtons){
            button.addEventListener('click',this.onToolbarButtonClick.bind(this))
        }


    }
    configureAdditionalTools(){
        const cleanButton=document.querySelector('#clean-btn') as HTMLButtonElement;
        const backButton=document.querySelector('#back-btn') as HTMLButtonElement;

        cleanButton.addEventListener('click',()=>{
            this.shapes=[];
            this.repaint()
        })

        backButton.addEventListener('click',()=>{
            this.shapes.pop();
            this.repaint()
        })

    }

    onToolbarButtonClick(event:MouseEvent){
        const targetedButton=event.target as HTMLInputElement;
        this.toolbarButtons.forEach(b=>b.classList.remove('selected'))
        targetedButton.classList.add('selected')
        this.configureEditor(+targetedButton.value)
    }




}
export default ShapesObjectEditor;
